import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  TransactionService,
  Transaction,
} from '../../shared/services/transaction-service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-new-transaction-form',
  imports: [FormsModule],
  templateUrl: './new-transaction-form.html',
  styleUrl: './new-transaction-form.scss',
})
export class NewTransactionForm {
  constructor(private transactionService: TransactionService) {}
  category = [
    'Insurance',
    'Rent',
    'Groceries',
    'Fuel',
    'House Bills',
    'Creams For Medication',
    'Subscriptions',
    'Dinning Out',
    'Credit Card Bills',
    'Other',
  ];

  // Don't worry about "amount: null" as when user inputs value, the value gets bonded to the variable amount
  transaction: Transaction = {
    amount: null,
    type: '',
    date: '',
    category: '',
    notes: '',
  };

  onSubmit() {
    this.transactionService.addTransaction(this.transaction).subscribe({
      next: (response) => {
        console.log('Saved Successfully: ', response);

        this.transaction = {
          amount: null,
          type: '',
          date: '',
          category: '',
          notes: '',
        };
      },

      error: (error) => {
        console.error('Save Error', error);
      },
    });
  }
}
