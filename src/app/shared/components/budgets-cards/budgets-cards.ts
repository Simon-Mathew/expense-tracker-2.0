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
}
