import { Component, Input } from '@angular/core';
import { Divider } from '../divider/divider';

@Component({
  selector: 'app-budgets-cards',
  imports: [Divider],
  templateUrl: './budgets-cards.html',
  styleUrl: './budgets-cards.scss',
})
export class BudgetsCards {
  @Input() title?: string;
  @Input() value: number = 0;
  @Input() limit: number = 0;
  @Input() balance: number = 0;

  get progress() {
    if (!this.limit || this.limit === 0) return 0;
    return Math.min(Math.round((this.value / this.limit) * 100), 100);
  }
}
