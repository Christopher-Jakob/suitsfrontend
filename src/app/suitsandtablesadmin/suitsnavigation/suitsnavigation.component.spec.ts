import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsnavigationComponent } from './suitsnavigation.component';

describe('SuitsnavigationComponent', () => {
  let component: SuitsnavigationComponent;
  let fixture: ComponentFixture<SuitsnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
