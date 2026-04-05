import { Component } from '@angular/core';
import { BudgetsCards } from '../shared/components/budgets-cards/budgets-cards';
import { MOCK_TRANSACTIONS } from '../assets/mock-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-budgets',
  imports: [BudgetsCards, DatePipe],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
})
export class Budgets {
  protected readonly info = MOCK_TRANSACTIONS;

  // Using Dictionary
  protected readonly budgetLimits = {
    Rent: 1200,
    Groceries: 200,
    Dining: 100,
    Transport: 250,
  };

  // protected get incomeDate(): string {

  // }
}
