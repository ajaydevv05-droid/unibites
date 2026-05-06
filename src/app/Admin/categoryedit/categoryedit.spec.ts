import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryedit } from './categoryedit';

describe('Categoryedit', () => {
  let component: Categoryedit;
  let fixture: ComponentFixture<Categoryedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
