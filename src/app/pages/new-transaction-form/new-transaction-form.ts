import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TransactionService,
  Transaction,
  TransactionType,
  Category,
} from '../../shared/services/transaction-service';

@Component({
  selector: 'app-new-transaction-form',
  imports: [FormsModule],
  templateUrl: './new-transaction-form.html',
  styleUrl: './new-transaction-form.scss',
})
export class NewTransactionForm {
  constructor(private transactionService: TransactionService) {}
  category: Category[] = [
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
    _id: '',
    amount: 0,
    type: 'Expense',
    date: '',
    category: 'Other',
    notes: '',
  };

  onSubmit() {
    this.transactionService.addTransaction(this.transaction).subscribe({
      next: (response) => {
        console.log('Saved Successfully: ', response);

        this.transaction = {
          _id: '',
          amount: 0,
          type: 'Expense',
          date: '',
          category: 'Other',
          notes: '',
        };
      },

      error: (error) => {
        console.error('Save Error', error);
      },
    });
  }
}
