import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foodregistration } from './foodregistration';

describe('Foodregistration', () => {
  let component: Foodregistration;
  let fixture: ComponentFixture<Foodregistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foodregistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foodregistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
