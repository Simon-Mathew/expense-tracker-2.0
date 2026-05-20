import {
  Component,
  Inject,
  AfterViewInit,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  TransactionService,
  Transaction,
} from '../../services/transaction-service';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  date: string;
  amount: number;
  merchant: string;
  type: string;
  category: string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatIconModule, AsyncPipe],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'category', 'type', 'amount'];
  dataSource$!: Observable<Transaction[]>;
  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.dataSource$ = this.transactionService.getTransaction();

    if (this.isBrowser) {
      this.updateColumns(window.innerWidth);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      window.addEventListener('resize', () => {
        this.updateColumns(window.innerWidth);
      });
    }
  }

  updateColumns(width: number) {
    if (width <= 600) {
      this.displayedColumns = ['date', 'amount', 'category'];
    } else {
      this.displayedColumns = ['date', 'category', 'type', 'amount'];
    }
  }
}
