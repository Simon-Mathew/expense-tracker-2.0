import { Component } from '@angular/core';
import { Card } from '../../../public/components/card/card';
import { Divider } from '../../../public/components/divider/divider';
import { MOCK_TRANSACTIONS } from '../../../public/assets/mock-data';
import { RouterLink } from '@angular/router';
import { Table } from '../../../public/components/table/table';
import { NewTransactionForm } from '../new-transaction-form/new-transaction-form';
import { Budgets } from '../budgets/budgets';

@Component({
  selector: 'app-dashboard',
  imports: [Card, Divider, RouterLink, Table, NewTransactionForm, Budgets],
  templateUrl: './Dashboard.html',
  styleUrls: ['./Dashboard.scss'],
})
export class Dashboard {
  protected readonly info = MOCK_TRANSACTIONS;

  protected get income(): number {
    return this.info
      .filter((t) => t.type === 'Income')
      .reduce((a, b) => a + b.amount, 0);
  }

  protected get expense(): number {
    return this.info
      .filter((t) => t.type === 'Expense')
      .reduce((a, b) => a + b.amount, 0);
  }

  protected get balance(): number {
    return this.income - this.expense;
  }

  protected format(n: number): string {
    return n.toLocaleString(undefined, { style: 'currency', currency: 'AUD' });
  }
}
