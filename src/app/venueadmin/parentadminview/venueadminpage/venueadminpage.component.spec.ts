import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueadminpageComponent } from './venueadminpage.component';

describe('VenueadminpageComponent', () => {
  let component: VenueadminpageComponent;
  let fixture: ComponentFixture<VenueadminpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueadminpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueadminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
