import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffregistration } from './staffregistration';

describe('Staffregistration', () => {
  let component: Staffregistration;
  let fixture: ComponentFixture<Staffregistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffregistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffregistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
