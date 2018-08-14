import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineshowphotosComponent } from './cuisineshowphotos.component';

describe('CuisineshowphotosComponent', () => {
  let component: CuisineshowphotosComponent;
  let fixture: ComponentFixture<CuisineshowphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineshowphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineshowphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
