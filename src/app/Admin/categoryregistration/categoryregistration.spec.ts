import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryregistration } from './categoryregistration';

describe('Categoryregistration', () => {
  let component: Categoryregistration;
  let fixture: ComponentFixture<Categoryregistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryregistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryregistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
