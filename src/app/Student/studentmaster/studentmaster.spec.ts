import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentmaster } from './studentmaster';

describe('Studentmaster', () => {
  let component: Studentmaster;
  let fixture: ComponentFixture<Studentmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
