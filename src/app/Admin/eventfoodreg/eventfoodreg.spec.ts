import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eventfoodreg } from './eventfoodreg';

describe('Eventfoodreg', () => {
  let component: Eventfoodreg;
  let fixture: ComponentFixture<Eventfoodreg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eventfoodreg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eventfoodreg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
