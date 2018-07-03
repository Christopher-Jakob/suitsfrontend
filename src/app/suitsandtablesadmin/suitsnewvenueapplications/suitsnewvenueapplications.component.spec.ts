import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsnewvenueapplicationsComponent } from './suitsnewvenueapplications.component';

describe('SuitsnewvenueapplicationsComponent', () => {
  let component: SuitsnewvenueapplicationsComponent;
  let fixture: ComponentFixture<SuitsnewvenueapplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsnewvenueapplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsnewvenueapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
