import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuelistComponent } from './venuelist.component';

describe('VenuelistComponent', () => {
  let component: VenuelistComponent;
  let fixture: ComponentFixture<VenuelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
