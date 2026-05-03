import { Injectable } from '@angular/core';
import { TransactionService, Transaction } from './transaction-service';

@Injectable({
  providedIn: 'root',
})
export class Budgeting {
  dataSource: Transaction[] = [];

  constructor(private transactionService: TransactionService) {
    this.transactionService.getTransaction().subscribe((data) => {
      this.dataSource = data;
    });
  }

  // This  function is used to get the date for the latest "Income"!!!
  getLatestIncomeDate(): Transaction | null {
    const incomes = this.dataSource.filter((t) => t.type === 'Income');
    if (incomes.length === 0) return null;

    return incomes.reduce((current, latest) => {
      const latestDate = new Date(latest.date).getTime();
      const currentDate = new Date(current.date).getTime();

      return currentDate > latestDate ? current : latest;
      // This just means
      // if (currentDate > latestDate) {
      //   return current;
      // } else {
      //   return latest;
      // }
    });
  }

  getCurrentFortnightTransactions(): Transaction[] {
    const latest = this.getLatestIncomeDate();
    if (!latest) return [];

    const startDate = new Date(latest.date).getTime();
    const endDate = startDate + 13 * 24 * 60 * 60 * 1000;

    return this.dataSource.filter((t) => {
      const transactionDate = new Date(t.date).getTime();

      return (
        t.type === 'Expense' &&
        transactionDate >= startDate &&
        transactionDate <= endDate
      );
    });
  }

  getCategorySpent(categories: string) {
    return this.getCurrentFortnightTransactions()
      .filter((t) => t.category === categories)
      .reduce((a, b) => a + b.amount, 0);
  }
}
