import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryview } from './categoryview';

describe('Categoryview', () => {
  let component: Categoryview;
  let fixture: ComponentFixture<Categoryview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
