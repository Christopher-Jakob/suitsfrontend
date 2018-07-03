import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueuserprofileComponent } from './venueuserprofile.component';

describe('VenueuserprofileComponent', () => {
  let component: VenueuserprofileComponent;
  let fixture: ComponentFixture<VenueuserprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueuserprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
