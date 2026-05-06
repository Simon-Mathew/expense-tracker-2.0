import { Component, OnInit } from '@angular/core';
import {
  TransactionService,
  Transaction,
} from '../../shared/services/transaction-service';
import { Observable } from 'rxjs';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-transaction-page',
  imports: [Button],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.scss',
})
export class TransactionPage implements OnInit {
  dataSource!: Observable<Transaction[]>;
  constructor(transactionService: TransactionService) {}

  ngOnInit(): void {}
}
