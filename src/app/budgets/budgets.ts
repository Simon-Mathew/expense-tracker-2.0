import { Component } from '@angular/core';
import { BudgetsCards } from '../shared/components/budgets-cards/budgets-cards';
import { MOCK_TRANSACTIONS } from '../assets/mock-data';
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
    } else {
      console.log('No income yet');
    }
  }
}
