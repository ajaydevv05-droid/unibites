import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paymentview } from './paymentview';

describe('Paymentview', () => {
  let component: Paymentview;
  let fixture: ComponentFixture<Paymentview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paymentview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paymentview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
