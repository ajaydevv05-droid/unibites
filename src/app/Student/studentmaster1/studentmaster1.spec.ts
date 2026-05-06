import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentmaster1 } from './studentmaster1';

describe('Studentmaster1', () => {
  let component: Studentmaster1;
  let fixture: ComponentFixture<Studentmaster1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentmaster1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentmaster1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
