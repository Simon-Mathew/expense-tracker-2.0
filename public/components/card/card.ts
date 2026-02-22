import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Divider } from '../divider/divider';

type CardVariant =
  | 'Default-Header'
  | 'Expense'
  | 'Current-Balance'
  | 'Transactions';
type CardLayout = 'row' | 'stack';

@Component({
  selector: 'app-card',
  imports: [NgClass, Divider],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
})
export class Card {
  @Input() title?: string;
  @Input() subtitle?: string;

  @Input() variant: CardVariant = 'Default-Header';
  @Input() layout: CardLayout = 'stack';

  @Input() className?: string;
}
