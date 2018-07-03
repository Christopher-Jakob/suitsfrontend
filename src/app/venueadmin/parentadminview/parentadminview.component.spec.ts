import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentadminviewComponent } from './parentadminview.component';

describe('ParentadminviewComponent', () => {
  let component: ParentadminviewComponent;
  let fixture: ComponentFixture<ParentadminviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentadminviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentadminviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
