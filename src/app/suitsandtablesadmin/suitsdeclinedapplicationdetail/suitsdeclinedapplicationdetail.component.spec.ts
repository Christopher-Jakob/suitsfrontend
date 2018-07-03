import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsdeclinedapplicationdetailComponent } from './suitsdeclinedapplicationdetail.component';

describe('SuitsdeclinedapplicationdetailComponent', () => {
  let component: SuitsdeclinedapplicationdetailComponent;
  let fixture: ComponentFixture<SuitsdeclinedapplicationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsdeclinedapplicationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsdeclinedapplicationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
