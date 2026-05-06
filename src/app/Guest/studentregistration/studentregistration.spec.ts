import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studentregistration } from './studentregistration';

describe('Studentregistration', () => {
  let component: Studentregistration;
  let fixture: ComponentFixture<Studentregistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studentregistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studentregistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
