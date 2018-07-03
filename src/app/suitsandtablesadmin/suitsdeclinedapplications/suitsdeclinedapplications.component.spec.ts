import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsdeclinedapplicationsComponent } from './suitsdeclinedapplications.component';

describe('SuitsdeclinedapplicationsComponent', () => {
  let component: SuitsdeclinedapplicationsComponent;
  let fixture: ComponentFixture<SuitsdeclinedapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsdeclinedapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsdeclinedapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
