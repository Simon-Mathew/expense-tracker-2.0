import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TransactionPage } from './transaction-page';
import {
  Transaction,
  TransactionService,
} from '../../shared/services/transaction-service';

describe('TransactionPage', () => {
  let component: TransactionPage;
  let fixture: ComponentFixture<TransactionPage>;
  let transactions: Transaction[];

  beforeEach(async () => {
    transactions = [
      {
        _id: '1',
        amount: 40,
        type: 'Expense',
        date: '2024-02-01',
        category: 'Groceries',
        notes: 'weekly food shop',
      },
      {
        _id: '2',
        amount: 2500,
        type: 'Income',
        date: '2024-04-01',
        category: 'Salary',
        notes: 'monthly salary',
      },
      {
        _id: '3',
        amount: 15,
        type: 'Expense',
        date: '2024-03-15',
        category: 'Subscriptions',
        notes: 'streaming service',
      },
    ];

    await TestBed.configureTestingModule({
      imports: [TransactionPage],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            getTransaction: jasmine
              .createSpy('getTransaction')
              .and.returnValue(of(transactions)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads transactions with the latest date first', () => {
    const categories = getRenderedCategories();

    expect(categories).toEqual(['Salary', 'Subscriptions', 'Groceries']);
  });

  it('filters income transactions', () => {
    clickFilter('Income');

    expect(getRenderedCategories()).toEqual(['Salary']);
  });

  it('filters subscription transactions', () => {
    clickFilter('Subscription');

    expect(getRenderedCategories()).toEqual(['Subscriptions']);
  });

  function clickFilter(label: string): void {
    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );
    buttons.find((button) => button.textContent?.trim() === label)?.click();
    fixture.detectChanges();
  }

  function getRenderedCategories(): string[] {
    const headings: HTMLHeadingElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('app-expense-income-card h2'),
    );
    return headings.map((heading) => heading.textContent?.trim() ?? '');
  }
});
