import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitsandtablesadminComponent } from './suitsandtablesadmin.component';

describe('SuitsandtablesadminComponent', () => {
  let component: SuitsandtablesadminComponent;
  let fixture: ComponentFixture<SuitsandtablesadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitsandtablesadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitsandtablesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
