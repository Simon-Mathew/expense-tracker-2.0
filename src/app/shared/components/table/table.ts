import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  TransactionService,
  Transaction,
} from '../../services/transaction-service';

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
export class Table implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'category', 'type', 'amount'];
  dataSource: Transaction[] = [];

  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.transactionService.getTransaction().subscribe((data) => {
      this.dataSource = data;
    });

    if (this.isBrowser) {
      this.updateColumns(window.innerWidth);

      window.addEventListener('resize', () => {
        this.updateColumns(window.innerWidth);
      });
    }
  }

  updateColumns(width: number) {
    if (width <= 600) {
      this.displayedColumns = ['date', 'amount', 'category'];
    } else if (width <= 768) {
      this.displayedColumns = ['date', 'amount', 'category', 'type'];
    } else {
      this.displayedColumns = ['id', 'date', 'category', 'type', 'amount'];
    }
  }
}
