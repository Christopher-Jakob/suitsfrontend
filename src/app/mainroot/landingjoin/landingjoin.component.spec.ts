import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingjoinComponent } from './landingjoin.component';

describe('LandingjoinComponent', () => {
  let component: LandingjoinComponent;
  let fixture: ComponentFixture<LandingjoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingjoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingjoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
