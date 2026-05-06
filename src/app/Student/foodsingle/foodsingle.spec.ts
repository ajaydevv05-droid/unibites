import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foodsingle } from './foodsingle';

describe('Foodsingle', () => {
  let component: Foodsingle;
  let fixture: ComponentFixture<Foodsingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foodsingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foodsingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
