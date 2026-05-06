import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staffedit } from './staffedit';

describe('Staffedit', () => {
  let component: Staffedit;
  let fixture: ComponentFixture<Staffedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Staffedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staffedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
