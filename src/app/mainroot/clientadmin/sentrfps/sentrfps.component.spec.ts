import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentrfpsComponent } from './sentrfps.component';

describe('SentrfpsComponent', () => {
  let component: SentrfpsComponent;
  let fixture: ComponentFixture<SentrfpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentrfpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentrfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
