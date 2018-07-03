import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueshowphotosComponent } from './venueshowphotos.component';

describe('VenueshowphotosComponent', () => {
  let component: VenueshowphotosComponent;
  let fixture: ComponentFixture<VenueshowphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueshowphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueshowphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
