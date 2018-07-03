import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueroomshowphotosComponent } from './venueroomshowphotos.component';

describe('VenueroomshowphotosComponent', () => {
  let component: VenueroomshowphotosComponent;
  let fixture: ComponentFixture<VenueroomshowphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueroomshowphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueroomshowphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
