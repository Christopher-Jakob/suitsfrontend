import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuecreateeditComponent } from './venuecreateedit.component';

describe('VenuecreateeditComponent', () => {
  let component: VenuecreateeditComponent;
  let fixture: ComponentFixture<VenuecreateeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuecreateeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuecreateeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
