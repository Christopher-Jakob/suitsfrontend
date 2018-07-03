import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsnavbarComponent } from './suitsnavbar.component';

describe('SuitsnavbarComponent', () => {
  let component: SuitsnavbarComponent;
  let fixture: ComponentFixture<SuitsnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
