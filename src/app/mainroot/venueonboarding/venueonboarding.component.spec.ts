import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueonboardingComponent } from './venueonboarding.component';

describe('VenueonboardingComponent', () => {
  let component: VenueonboardingComponent;
  let fixture: ComponentFixture<VenueonboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueonboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
