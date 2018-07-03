import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueadminactualComponent } from './venueadminactual.component';

describe('VenueadminactualComponent', () => {
  let component: VenueadminactualComponent;
  let fixture: ComponentFixture<VenueadminactualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueadminactualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueadminactualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
