import { Component } from '@angular/core';

@Component({
  selector: 'app-new-transaction-form',
  imports: [],
  templateUrl: './new-transaction-form.html',
  styleUrl: './new-transaction-form.scss',
})
export class NewTransactionForm {
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
}
