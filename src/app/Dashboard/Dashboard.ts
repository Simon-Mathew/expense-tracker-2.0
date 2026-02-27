import { Component } from '@angular/core';
import { Card } from '../../../public/components/card/card';
import { Divider } from '../../../public/components/divider/divider';
import { MOCK_TRANSACTIONS } from '../../../public/assets/mock-data';

@Component({
  selector: 'app-header',
  imports: [Card, Divider],
  templateUrl: './Dashboard.html',
  styleUrl: './Dashboard.scss',
})
export class Dashboard {
  protected readonly info = MOCK_TRANSACTIONS;

  protected get income(): number {
    return this.info
      .filter((t) => t.type === 'Income')
      .reduce((a, b) => a + b.amount, 0);
  }

  protected format(n: number): string {
    return n.toLocaleString(undefined, { style: 'currency', currency: 'AUD' });
  }
}
