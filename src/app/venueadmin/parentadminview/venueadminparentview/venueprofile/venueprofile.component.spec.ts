import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueprofileComponent } from './venueprofile.component';

describe('VenueprofileComponent', () => {
  let component: VenueprofileComponent;
  let fixture: ComponentFixture<VenueprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
