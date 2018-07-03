import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UservenueverificaitonComponent } from './uservenueverificaiton.component';

describe('UservenueverificaitonComponent', () => {
  let component: UservenueverificaitonComponent;
  let fixture: ComponentFixture<UservenueverificaitonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UservenueverificaitonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UservenueverificaitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
