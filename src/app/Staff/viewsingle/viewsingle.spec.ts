import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewsingle } from './viewsingle';

describe('Viewsingle', () => {
  let component: Viewsingle;
  let fixture: ComponentFixture<Viewsingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewsingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewsingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
