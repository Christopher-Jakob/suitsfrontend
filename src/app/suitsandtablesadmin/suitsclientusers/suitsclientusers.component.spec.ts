import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsclientusersComponent } from './suitsclientusers.component';

describe('SuitsclientusersComponent', () => {
  let component: SuitsclientusersComponent;
  let fixture: ComponentFixture<SuitsclientusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsclientusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsclientusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
