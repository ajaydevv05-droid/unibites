import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monthlydetails } from './monthlydetails';

describe('Monthlydetails', () => {
  let component: Monthlydetails;
  let fixture: ComponentFixture<Monthlydetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monthlydetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Monthlydetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
