import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsvenueusersComponent } from './suitsvenueusers.component';

describe('SuitsvenueusersComponent', () => {
  let component: SuitsvenueusersComponent;
  let fixture: ComponentFixture<SuitsvenueusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsvenueusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsvenueusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
