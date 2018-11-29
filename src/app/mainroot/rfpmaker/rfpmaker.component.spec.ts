import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpmakerComponent } from './rfpmaker.component';

describe('RfpmakerComponent', () => {
  let component: RfpmakerComponent;
  let fixture: ComponentFixture<RfpmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
