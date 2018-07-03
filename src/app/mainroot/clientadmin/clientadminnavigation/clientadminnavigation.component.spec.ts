import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientadminnavigationComponent } from './clientadminnavigation.component';

describe('ClientadminnavigationComponent', () => {
  let component: ClientadminnavigationComponent;
  let fixture: ComponentFixture<ClientadminnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientadminnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientadminnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
