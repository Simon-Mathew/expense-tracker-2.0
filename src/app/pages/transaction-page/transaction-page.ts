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

  private sortByLatestDate(transactions: Transaction[]): Transaction[] {
    return [...transactions].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date),
    );
  }
}
