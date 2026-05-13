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
} from '../../shared/services/transaction-service';
import { ExpenseIncomeCard } from '../../shared/components/expense-income-card/expense-income-card';

type TransactionFilter = 'All' | 'Income' | 'Expenses' | 'Subscription';

@Component({
  selector: 'app-transaction-page',
  imports: [ExpenseIncomeCard],
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
    this.editingTransactionId.set(transaction._id);
  }

  protected cancelEditing(): void {
    this.errorMessage.set('');
    this.editingTransactionId.set(null);
  }

  protected updateAmount(transaction: Transaction, amount: number): void {
    if (!Number.isFinite(amount) || amount < 0) {
      this.errorMessage.set('Enter a valid transaction amount.');
      return;
    }

    this.errorMessage.set('');
    this.savingTransactionId.set(transaction._id);

    this.transactionService
      .updateTransactionAmount(transaction._id, amount)
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
}
