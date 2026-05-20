import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Budgets } from './budgets';
import { Budgeting } from '../../shared/services/budgeting';

describe('Budgets', () => {
  let component: Budgets;
  let fixture: ComponentFixture<Budgets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Budgets],
      providers: [
        {
          provide: Budgeting,
          useValue: {
            getBudgetSummary: jasmine.createSpy('getBudgetSummary').and.returnValue(
              of({
                latestIncome: {
                  _id: 'income-1',
                  amount: 2500,
                  type: 'Income',
                  date: '2024-04-01',
                  category: 'Salary',
                  notes: 'monthly salary',
                },
                categories: [
                  {
                    title: 'Rent',
                    category: 'Rent',
                    spent: 450,
                    limit: 450,
                  },
                ],
              }),
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Budgets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders budget data after it loads', () => {
    const card: HTMLElement | null =
      fixture.nativeElement.querySelector('app-budgets-cards');

    expect(card?.textContent).toContain('Rent');
    expect(card?.textContent).toContain('$ 450');
  });
});
