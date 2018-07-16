import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewvenueroomComponent } from './previewvenueroom.component';

describe('PreviewvenueroomComponent', () => {
  let component: PreviewvenueroomComponent;
  let fixture: ComponentFixture<PreviewvenueroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewvenueroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewvenueroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
