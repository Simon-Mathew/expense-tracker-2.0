import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Divider } from '../divider/divider';

type CardVariant =
  | 'default-header'
  | 'income'
  | 'expense'
  | 'current-balance'
  | 'transactions';
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

  @Input() variant: CardVariant = 'default-header';
  @Input() layout: CardLayout = 'stack';

  @Input() className?: string;
}
