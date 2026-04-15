import { Component } from '@angular/core';
import { BudgetsCards } from '../shared/components/budgets-cards/budgets-cards';
import {
  MOCK_TRANSACTIONS,
  transactions,
} from '../../../public/assets/mock-data';
import { Budgeting } from '../budgeting';

@Component({
  selector: 'app-budgets',
  imports: [BudgetsCards],
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

  rentSpent = 0;
  groceriesSpent = 0;
  diningSpent = 0;
  transportSpent = 0;

  //  Using this constructor to get the Budget date cycle running
  constructor(private budgeting: Budgeting) {
    console.log(this.budgeting.getLatestIncomeDate());

    // latestIncome uses the function from the service to get the latest date
    const latest = this.budgeting.getLatestIncomeDate();
    const latestIncome = latest ? new Date(latest.date).getTime() : null;

    if (latestIncome !== null) {
      const fortnightBudget = latestIncome + 13 * 24 * 60 * 60 * 1000;
      const fortnightDate = new Date(fortnightBudget);
      console.log('End of cycle', fortnightDate);

      console.log('Start of cycle', latest?.date);
      console.log('End of cycle', fortnightDate);

      this.rentSpent = this.budgeting.getCategorySpent('Rent');
      this.groceriesSpent = this.budgeting.getCategorySpent('Groceries');
      this.diningSpent = this.budgeting.getCategorySpent('Dining');
      this.transportSpent = this.budgeting.getCategorySpent('Transport');

      console.log('Rent:', this.rentSpent);
      console.log('Groceries:', this.groceriesSpent);
      console.log('Dining:', this.diningSpent);
      console.log('Transport:', this.transportSpent);
    } else {
      console.log('No income yet');
    }
  }
}
