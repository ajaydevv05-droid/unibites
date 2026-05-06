import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stockupdate } from './stockupdate';

describe('Stockupdate', () => {
  let component: Stockupdate;
  let fixture: ComponentFixture<Stockupdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stockupdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stockupdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
