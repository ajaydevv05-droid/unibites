import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffpayment } from './staffpayment';

describe('Staffpayment', () => {
  let component: Staffpayment;
  let fixture: ComponentFixture<Staffpayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffpayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffpayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
