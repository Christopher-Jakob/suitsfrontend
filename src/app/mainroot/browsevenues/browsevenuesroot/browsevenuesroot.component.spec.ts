import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsevenuesrootComponent } from './browsevenuesroot.component';

describe('BrowsevenuesrootComponent', () => {
  let component: BrowsevenuesrootComponent;
  let fixture: ComponentFixture<BrowsevenuesrootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsevenuesrootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsevenuesrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
