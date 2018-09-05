import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuefullbuyoutshowphotosComponent } from './venuefullbuyoutshowphotos.component';

describe('VenuefullbuyoutshowphotosComponent', () => {
  let component: VenuefullbuyoutshowphotosComponent;
  let fixture: ComponentFixture<VenuefullbuyoutshowphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuefullbuyoutshowphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuefullbuyoutshowphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
