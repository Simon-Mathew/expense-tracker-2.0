import { Injectable } from '@angular/core';
import { MOCK_TRANSACTIONS } from './assets/mock-data';

@Injectable({
  providedIn: 'root',
})
export class Budgeting {
  protected readonly info = MOCK_TRANSACTIONS;

  // This  function is used to get the date for the latest "Income"!!!
  getLatestIncomeDate() {
    const incomes = this.info.filter((t) => t.type === 'Income');
    if (incomes.length === 0) return console.log('No Income yet');

    return incomes.reduce((current, latest) => {
      const latestDate = new Date(latest.date).getTime();
      const currentDate = new Date(current.date).getTime();

      return currentDate > latestDate ? current : latest;
      // This just means
      // if (currentDate > latestDate) {
      //   return current;
      // } else {
      //   return latest;
      // }
    });
  }
}
