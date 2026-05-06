import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eventreg } from './eventreg';

describe('Eventreg', () => {
  let component: Eventreg;
  let fixture: ComponentFixture<Eventreg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eventreg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eventreg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
