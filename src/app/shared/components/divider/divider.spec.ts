import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ddivider } from './ddivider';

describe('Ddivider', () => {
  let component: Ddivider;
  let fixture: ComponentFixture<Ddivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ddivider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ddivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
