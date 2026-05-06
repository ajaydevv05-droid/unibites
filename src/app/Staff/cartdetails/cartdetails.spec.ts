import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cartdetails } from './cartdetails';

describe('Cartdetails', () => {
  let component: Cartdetails;
  let fixture: ComponentFixture<Cartdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cartdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cartdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
