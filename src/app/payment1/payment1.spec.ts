import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment1 } from './payment1';

describe('Payment1', () => {
  let component: Payment1;
  let fixture: ComponentFixture<Payment1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Payment1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Payment1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
