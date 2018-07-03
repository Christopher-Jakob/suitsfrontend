import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuepageComponent } from './venuepage.component';

describe('VenuepageComponent', () => {
  let component: VenuepageComponent;
  let fixture: ComponentFixture<VenuepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
