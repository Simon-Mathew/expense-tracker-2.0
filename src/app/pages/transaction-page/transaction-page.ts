import { Component, OnInit } from '@angular/core';
import {
  TransactionService,
  Transaction,
} from '../../shared/services/transaction-service';
import { Button } from '../../shared/components/button/button';
import { ExpenseIncomeCard } from '../../shared/components/expense-income-card/expense-income-card';

@Component({
  selector: 'app-transaction-page',
  imports: [Button, ExpenseIncomeCard],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.scss',
})
export class TransactionPage implements OnInit {
  dataSource: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService
      .getTransaction()
      .subscribe((data: Transaction[]) => {
        this.dataSource = data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      });
  }
}
