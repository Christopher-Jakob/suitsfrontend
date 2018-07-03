import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueadminroomrootComponent } from './venueadminroomroot.component';

describe('VenueadminroomrootComponent', () => {
  let component: VenueadminroomrootComponent;
  let fixture: ComponentFixture<VenueadminroomrootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueadminroomrootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueadminroomrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
