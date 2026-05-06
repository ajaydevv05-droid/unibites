import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffmaster } from './staffmaster';

describe('Staffmaster', () => {
  let component: Staffmaster;
  let fixture: ComponentFixture<Staffmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
