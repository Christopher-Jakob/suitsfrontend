import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitssettingsComponent } from './suitssettings.component';

describe('SuitssettingsComponent', () => {
  let component: SuitssettingsComponent;
  let fixture: ComponentFixture<SuitssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
