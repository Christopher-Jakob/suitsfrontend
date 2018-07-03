import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsgroupsandvenuesComponent } from './suitsgroupsandvenues.component';

describe('SuitsgroupsandvenuesComponent', () => {
  let component: SuitsgroupsandvenuesComponent;
  let fixture: ComponentFixture<SuitsgroupsandvenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsgroupsandvenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsgroupsandvenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
