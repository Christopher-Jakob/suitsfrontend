import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueadminroomlistComponent } from './venueadminroomlist.component';

describe('VenueadminroomlistComponent', () => {
  let component: VenueadminroomlistComponent;
  let fixture: ComponentFixture<VenueadminroomlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueadminroomlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueadminroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
