import { Component } from '@angular/core';
import { BudgetsCards } from '../../../public/components/budgets-cards/budgets-cards';

@Component({
  selector: 'app-budgets',
  imports: [BudgetsCards],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
})
export class Budgets {}
