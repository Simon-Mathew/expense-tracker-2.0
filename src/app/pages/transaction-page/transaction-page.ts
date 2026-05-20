import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  TransactionService,
  Transaction,
  TransactionUpdatePayload,
  TransactionType,
  expenseCategory,
  incomeCategory,
} from '../../shared/services/transaction-service';
import { ExpenseIncomeCard } from '../../shared/components/expense-income-card/expense-income-card';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

type TransactionFilter = 'All' | 'Income' | 'Expenses' | 'Subscription';

@Component({
  selector: 'app-transaction-page',
  imports: [ExpenseIncomeCard, ReactiveFormsModule],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPage implements OnInit {
  private readonly transactionService = inject(TransactionService);

  protected readonly filters: TransactionFilter[] = [
    'All',
    'Income',
    'Expenses',
    'Subscription',
  ];

  protected readonly selectedFilter = signal<TransactionFilter>('All');
  protected readonly editingTransactionId = signal<string | null>(null);
  protected readonly savingTransactionId = signal<string | null>(null);
  protected readonly deletingTransactionId = signal<string | null>(null);
  protected readonly errorMessage = signal('');
  private readonly transactions = signal<Transaction[]>([]);
  protected readonly expenseCategories: expenseCategory[] = [
    'Insurance',
    'Rent',
    'Groceries',
    'Transport',
    'House Bills',
    'Creams For Medication',
    'Subscriptions',
    'Dinning',
    'Credit Card Bills',
    'Other',
  ];
  protected readonly incomeCategories: incomeCategory[] = [
    'Salary',
    'Back Transfer',
    'Loan',
  ];
  protected readonly editForm = new FormGroup({
    amount: new FormControl(0, { nonNullable: true }),
    type: new FormControl<TransactionType>('Expense', { nonNullable: true }),
    date: new FormControl('', { nonNullable: true }),
    category: new FormControl<expenseCategory | incomeCategory>('Other', {
      nonNullable: true,
    }),
    notes: new FormControl('', { nonNullable: true }),
  });

  protected readonly filteredTransactions = computed(() => {
    const selectedFilter = this.selectedFilter();
    const transactions = this.transactions();

    if (selectedFilter === 'Income') {
      return transactions.filter((transaction) => transaction.type === 'Income');
    }

    if (selectedFilter === 'Expenses') {
      return transactions.filter((transaction) => transaction.type === 'Expense');
    }

    if (selectedFilter === 'Subscription') {
      return transactions.filter(
        (transaction) => transaction.category === 'Subscriptions',
      );
    }

    return transactions;
  });

  ngOnInit(): void {
    this.transactionService.getTransaction().subscribe((data) => {
      this.transactions.set(this.sortByLatestDate(data));
    });
  }

  protected selectFilter(filter: TransactionFilter): void {
    this.selectedFilter.set(filter);
  }

  protected startEditing(transaction: Transaction): void {
    this.errorMessage.set('');
    this.editForm.setValue({
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
      category: transaction.category,
      notes: transaction.notes ?? '',
    });
    this.editingTransactionId.set(transaction._id);
  }

  protected cancelEditing(): void {
    this.errorMessage.set('');
    this.editingTransactionId.set(null);
  }

  protected syncCategoryForType(): void {
    const type = this.editForm.controls.type.value;
    const category = this.editForm.controls.category.value;
    const categories: readonly (expenseCategory | incomeCategory)[] =
      type === 'Expense' ? this.expenseCategories : this.incomeCategories;

    if (!categories.includes(category)) {
      this.editForm.controls.category.setValue(categories[0]);
    }
  }

  protected updateTransaction(transaction: Transaction): void {
    const payload = this.getValidatedTransactionPayload();

    if (!payload) {
      this.errorMessage.set('Enter a valid transaction update.');
      return;
    }

    this.errorMessage.set('');
    this.savingTransactionId.set(transaction._id);

    this.transactionService
      .updateTransaction(transaction._id, payload)
      .subscribe({
        next: (response) => {
          this.transactions.update((transactions) =>
            this.sortByLatestDate(
              transactions.map((item) =>
                item._id === transaction._id ? response.data : item,
              ),
            ),
          );
          this.editingTransactionId.set(null);
          this.savingTransactionId.set(null);
        },
        error: () => {
          this.errorMessage.set('Could not update this transaction.');
          this.savingTransactionId.set(null);
        },
      });
  }

  protected deleteTransaction(transaction: Transaction): void {
    this.errorMessage.set('');
    this.deletingTransactionId.set(transaction._id);

    this.transactionService.deleteTransaction(transaction._id).subscribe({
      next: () => {
        this.transactions.update((transactions) =>
          transactions.filter((item) => item._id !== transaction._id),
        );
        this.deletingTransactionId.set(null);
      },
      error: () => {
        this.errorMessage.set('Could not delete this transaction.');
        this.deletingTransactionId.set(null);
      },
    });
  }

  private sortByLatestDate(transactions: Transaction[]): Transaction[] {
    return [...transactions].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date),
    );
  }

  private getValidatedTransactionPayload(): TransactionUpdatePayload | null {
    const amount = Number(this.editForm.controls.amount.value);
    const type = this.editForm.controls.type.value;
    const date = this.editForm.controls.date.value.trim();
    const category = this.editForm.controls.category.value;
    const notes = this.editForm.controls.notes.value.trim();

    if (!Number.isFinite(amount) || amount < 0 || !category) {
      return null;
    }

    const payload: TransactionUpdatePayload = {
      amount,
      type,
      category,
      notes,
    };

    if (date) {
      payload.date = date;
    }

    return payload;
  }
}
