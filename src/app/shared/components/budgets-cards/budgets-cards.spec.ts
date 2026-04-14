import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsCards } from './budgets-cards';

describe('BudgetsCards', () => {
  let component: BudgetsCards;
  let fixture: ComponentFixture<BudgetsCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
