import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icons',
  imports: [],
  templateUrl: './icons.html',
  styleUrl: './icons.scss',
})
export class Icons {
  @Input() category:
    | 'Insurance'
    | 'Rent'
    | 'Groceries'
    | 'Transport'
    | 'House Bills'
    | 'Creams For Medication'
    | 'Subscriptions'
    | 'Dinning'
    | 'Credit Card Bills'
    | 'Other'
    | 'Salary'
    | 'Back Transfer'
    | 'Loan' = 'Salary';
}
