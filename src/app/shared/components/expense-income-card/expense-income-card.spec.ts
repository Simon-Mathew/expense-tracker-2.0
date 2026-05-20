import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseIncomeCard } from './expense-income-card';

describe('ExpenseIncomeCard', () => {
  let component: ExpenseIncomeCard;
  let fixture: ComponentFixture<ExpenseIncomeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseIncomeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseIncomeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
