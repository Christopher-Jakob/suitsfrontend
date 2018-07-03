import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnavigationComponent } from './adminnavigation.component';

describe('AdminnavigationComponent', () => {
  let component: AdminnavigationComponent;
  let fixture: ComponentFixture<AdminnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
