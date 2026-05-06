import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackview } from './feedbackview';

describe('Feedbackview', () => {
  let component: Feedbackview;
  let fixture: ComponentFixture<Feedbackview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feedbackview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feedbackview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
