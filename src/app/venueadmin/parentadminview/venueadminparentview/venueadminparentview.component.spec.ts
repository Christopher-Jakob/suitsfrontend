import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueadminparentviewComponent } from './venueadminparentview.component';

describe('VenueadminparentviewComponent', () => {
  let component: VenueadminparentviewComponent;
  let fixture: ComponentFixture<VenueadminparentviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueadminparentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueadminparentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
