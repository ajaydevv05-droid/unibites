import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffmaster1 } from './staffmaster1';

describe('Staffmaster1', () => {
  let component: Staffmaster1;
  let fixture: ComponentFixture<Staffmaster1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffmaster1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffmaster1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
