import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TransactionService,
  Transaction,
} from '../../shared/services/transaction-service';

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
    'Transport',
    'House Bills',
    'Creams For Medication',
    'Subscriptions',
    'Dinning',
    'Credit Card Bills',
    'Other',
  ];

  // Don't worry about "amount: null" as when user inputs value, the value gets bonded to the variable amount
  transaction: Transaction = {
    amount: 0,
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
          amount: 0,
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
