import { TestBed } from '@angular/core/testing';

import { Budgeting } from './budgeting';

describe('Budgeting', () => {
  let service: Budgeting;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Budgeting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
