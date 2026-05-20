import { Component, Input } from '@angular/core';
import {
  TransactionType,
  expenseCategory,
  incomeCategory,
} from '../../services/transaction-service';
import { Icons } from '../icons/icons';

@Component({
  selector: 'app-expense-income-card',
  imports: [Icons],
  templateUrl: './expense-income-card.html',
  styleUrl: './expense-income-card.scss',
})
export class ExpenseIncomeCard {
  @Input() type: TransactionType = 'Expense';
  @Input() amount: number = 0;
  @Input() notes?: string;
  @Input() date: string = '';
  @Input() category: expenseCategory | incomeCategory = 'Other';

  fiveWordsNotes(text: string): string {
    return text.split(' ').slice(0, 5).join(' ');
  }
}
