import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueroomadminpageComponent } from './venueroomadminpage.component';

describe('VenueroomadminpageComponent', () => {
  let component: VenueroomadminpageComponent;
  let fixture: ComponentFixture<VenueroomadminpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueroomadminpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueroomadminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
