import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsvenueonboardingComponent } from './suitsvenueonboarding.component';

describe('SuitsvenueonboardingComponent', () => {
  let component: SuitsvenueonboardingComponent;
  let fixture: ComponentFixture<SuitsvenueonboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsvenueonboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsvenueonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
