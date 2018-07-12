import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedrfpsComponent } from './receivedrfps.component';

describe('ReceivedrfpsComponent', () => {
  let component: ReceivedrfpsComponent;
  let fixture: ComponentFixture<ReceivedrfpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedrfpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedrfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
