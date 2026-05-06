import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffhome } from './staffhome';

describe('Staffhome', () => {
  let component: Staffhome;
  let fixture: ComponentFixture<Staffhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
