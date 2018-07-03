import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingvenueComponent } from './landingvenue.component';

describe('LandingvenueComponent', () => {
  let component: LandingvenueComponent;
  let fixture: ComponentFixture<LandingvenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingvenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
