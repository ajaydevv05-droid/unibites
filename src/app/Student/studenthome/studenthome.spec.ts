import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studenthome } from './studenthome';

describe('Studenthome', () => {
  let component: Studenthome;
  let fixture: ComponentFixture<Studenthome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studenthome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studenthome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
