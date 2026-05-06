import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foodview } from './foodview';

describe('Foodview', () => {
  let component: Foodview;
  let fixture: ComponentFixture<Foodview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foodview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foodview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
