import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import {
  expenseCategory,
  Transaction,
  TransactionService,
} from './transaction-service';

export interface BudgetLimit {
  _id?: string;
  title: string;
  category: expenseCategory;
  limit: number;
}

export interface BudgetCategorySummary {
  title: string;
  category: expenseCategory;
  spent: number;
  limit: number;
}

export interface BudgetSummary {
  latestIncome: Transaction | null;
  categories: BudgetCategorySummary[];
}

@Injectable({
  providedIn: 'root',
})
export class Budgeting {
  private readonly transactionService = inject(TransactionService);
  private readonly http = inject(HttpClient);
  private readonly budgetApiUrl = 'http://localhost:3000/api/budgets';

  getBudgetSummary(): Observable<BudgetSummary> {
    return forkJoin({
      transactions: this.transactionService.getTransaction(),
      budgets: this.getBudgetLimits(),
    }).pipe(
      map(({ transactions, budgets }) =>
        this.createBudgetSummary(transactions, budgets),
      ),
    );
  }

  updateBudgetLimit(
    category: expenseCategory,
    limit: number,
  ): Observable<BudgetLimit> {
    return this.http.patch<BudgetLimit>(
      `${this.budgetApiUrl}/${encodeURIComponent(category)}`,
      { limit },
    );
  }

  private getBudgetLimits(): Observable<BudgetLimit[]> {
    return this.http.get<BudgetLimit[]>(this.budgetApiUrl);
  }

  private createBudgetSummary(
    transactions: Transaction[],
    budgets: BudgetLimit[],
  ): BudgetSummary {
    const latestIncome = this.getLatestIncomeDate(transactions);
    const expenseTransactions = this.getExpenseTransactions(transactions);

    return {
      latestIncome,
      categories: budgets.map((budget) => ({
        ...budget,
        spent: this.getCategorySpent(expenseTransactions, budget.category),
      })),
    };
  }

  private getLatestIncomeDate(transactions: Transaction[]): Transaction | null {
    const incomes = transactions.filter((t) => t.type === 'Income');
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

  private getExpenseTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.filter((t) => {
      return t.type === 'Expense';
    });
  }

  private getCategorySpent(
    transactions: Transaction[],
    category: expenseCategory,
  ): number {
    return transactions
      .filter((t) => t.category === category)
      .reduce((a, b) => a + b.amount, 0);
  }
}
