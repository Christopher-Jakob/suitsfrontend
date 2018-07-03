import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitssuitstablesusersComponent } from './suitssuitstablesusers.component';

describe('SuitssuitstablesusersComponent', () => {
  let component: SuitssuitstablesusersComponent;
  let fixture: ComponentFixture<SuitssuitstablesusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitssuitstablesusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitssuitstablesusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
