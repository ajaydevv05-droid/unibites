import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffview } from './staffview';

describe('Staffview', () => {
  let component: Staffview;
  let fixture: ComponentFixture<Staffview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
