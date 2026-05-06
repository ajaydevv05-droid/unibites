import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singlefood } from './singlefood';

describe('Singlefood', () => {
  let component: Singlefood;
  let fixture: ComponentFixture<Singlefood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Singlefood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singlefood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
