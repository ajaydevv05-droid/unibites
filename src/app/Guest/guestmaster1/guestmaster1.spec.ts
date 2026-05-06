import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guestmaster1 } from './guestmaster1';

describe('Guestmaster1', () => {
  let component: Guestmaster1;
  let fixture: ComponentFixture<Guestmaster1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guestmaster1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guestmaster1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
