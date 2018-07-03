import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueapplicationreviewComponent } from './venueapplicationreview.component';

describe('VenueapplicationreviewComponent', () => {
  let component: VenueapplicationreviewComponent;
  let fixture: ComponentFixture<VenueapplicationreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueapplicationreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueapplicationreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
