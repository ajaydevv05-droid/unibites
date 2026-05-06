import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singleview } from './singleview';

describe('Singleview', () => {
  let component: Singleview;
  let fixture: ComponentFixture<Singleview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Singleview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singleview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
