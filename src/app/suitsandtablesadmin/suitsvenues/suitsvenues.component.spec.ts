import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsvenuesComponent } from './suitsvenues.component';

describe('SuitsvenuesComponent', () => {
  let component: SuitsvenuesComponent;
  let fixture: ComponentFixture<SuitsvenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsvenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsvenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
