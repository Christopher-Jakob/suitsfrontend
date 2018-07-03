import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitssuitsuserprofileComponent } from './suitssuitsuserprofile.component';

describe('SuitssuitsuserprofileComponent', () => {
  let component: SuitssuitsuserprofileComponent;
  let fixture: ComponentFixture<SuitssuitsuserprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitssuitsuserprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitssuitsuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
