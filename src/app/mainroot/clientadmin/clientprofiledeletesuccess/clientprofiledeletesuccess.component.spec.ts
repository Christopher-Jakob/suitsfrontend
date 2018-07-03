import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientprofiledeletesuccessComponent } from './clientprofiledeletesuccess.component';

describe('ClientprofiledeletesuccessComponent', () => {
  let component: ClientprofiledeletesuccessComponent;
  let fixture: ComponentFixture<ClientprofiledeletesuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientprofiledeletesuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientprofiledeletesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
