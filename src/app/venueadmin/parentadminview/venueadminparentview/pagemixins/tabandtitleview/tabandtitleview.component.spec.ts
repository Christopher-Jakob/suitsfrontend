import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabandtitleviewComponent } from './tabandtitleview.component';

describe('TabandtitleviewComponent', () => {
  let component: TabandtitleviewComponent;
  let fixture: ComponentFixture<TabandtitleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabandtitleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabandtitleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
