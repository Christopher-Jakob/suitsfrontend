import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewvenueComponent } from './previewvenue.component';

describe('PreviewvenueComponent', () => {
  let component: PreviewvenueComponent;
  let fixture: ComponentFixture<PreviewvenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewvenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
