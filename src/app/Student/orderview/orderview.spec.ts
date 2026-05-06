import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderview } from './orderview';

describe('Orderview', () => {
  let component: Orderview;
  let fixture: ComponentFixture<Orderview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
