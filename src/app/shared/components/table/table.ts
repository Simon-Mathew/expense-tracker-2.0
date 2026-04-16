import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MOCK_TRANSACTIONS } from '../../../../../public/assets/mock-data';
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  date: string;
  id: number;
  amount: number;
  merchant: string;
  type: string;
  category: string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  protected readonly data = MOCK_TRANSACTIONS;

  displayedColumns: string[] = [
    'id',
    'date',
    'merchant',
    'category',
    'type',
    'amount',
  ];
  dataSource = this.data;

  ngOnInit() {
    this.updateColumns(window.innerWidth);

    window.addEventListener('resize', () => {
      this.updateColumns(window.innerWidth);
    });
  }

  updateColumns(width: number) {
    if (width <= 600) {
      this.displayedColumns = ['date', 'amount', 'merchant'];
    } else if (width <= 768) {
      this.displayedColumns = ['date', 'amount', 'merchant', 'category'];
    } else {
      this.displayedColumns = [
        'id',
        'date',
        'merchant',
        'category',
        'type',
        'amount',
      ];
    }
  }
}
