import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-divider',
  imports: [NgStyle],
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
})
export class Divider {
  @Input() maxWidth?: string;
  @Input() symbol: string = '✻';
  @Input() type: 'decorative' | 'minimal' = 'minimal';
}
