import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesignupageComponent } from './venuesignupage.component';

describe('VenuesignupageComponent', () => {
  let component: VenuesignupageComponent;
  let fixture: ComponentFixture<VenuesignupageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuesignupageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesignupageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
