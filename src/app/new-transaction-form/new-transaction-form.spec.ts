import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransactionForm } from './new-transaction-form';

describe('NewTransactionForm', () => {
  let component: NewTransactionForm;
  let fixture: ComponentFixture<NewTransactionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTransactionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTransactionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
