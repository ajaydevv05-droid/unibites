import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paymentreport } from './paymentreport';

describe('Paymentreport', () => {
  let component: Paymentreport;
  let fixture: ComponentFixture<Paymentreport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paymentreport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paymentreport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
