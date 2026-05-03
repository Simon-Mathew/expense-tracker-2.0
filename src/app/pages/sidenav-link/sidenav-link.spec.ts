import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLink } from './sidenav-link';

describe('SidenavLink', () => {
  let component: SidenavLink;
  let fixture: ComponentFixture<SidenavLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
