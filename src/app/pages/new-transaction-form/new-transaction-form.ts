import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-transaction-form',
  imports: [FormsModule],
  templateUrl: './new-transaction-form.html',
  styleUrl: './new-transaction-form.scss',
})
export class NewTransactionForm {
  constructor(private http: HttpClient) {}

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

  transaction = {
    amount: null,
    type: '',
    date: '',
    category: '',
    notes: '',
  };

  onSubmit() {
    console.log('Submitting transaction: ', this.transaction);

    this.http
      .post('http://localhost:3000/api/transactions', this.transaction)
      .subscribe({
        next: (response) => {
          console.log('Saved Successfully ', response);
        },
        error: (error) => {
          console.error('Save error: ', error);
        },
      });
  }
}
