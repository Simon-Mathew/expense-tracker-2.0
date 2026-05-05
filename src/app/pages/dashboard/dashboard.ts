import { Component, OnInit } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { Divider } from '../../shared/components/divider/divider';
import { RouterLink } from '@angular/router';
import { Table } from '../../shared/components/table/table';
import { NewTransactionForm } from '../new-transaction-form/new-transaction-form';
import {
  TransactionService,
  Transaction,
} from '../../shared/services/transaction-service';

@Component({
  selector: 'app-dashboard',
  imports: [Card, Divider, RouterLink, Table, NewTransactionForm],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  dataSource: Transaction[] = [];
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransaction().subscribe((data) => {
      this.dataSource = data;
    });
  }

  protected get income(): number {
    return this.dataSource
      .filter((t) => t.type === 'Income')
      .reduce((a, b) => a + b.amount, 0);
  }

  protected get expense(): number {
    return this.dataSource
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
