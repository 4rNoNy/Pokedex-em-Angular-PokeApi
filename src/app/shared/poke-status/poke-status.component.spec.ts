import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeStatusComponent } from './poke-status.component';

describe('PokeStatusComponent', () => {
  let component: PokeStatusComponent;
  let fixture: ComponentFixture<PokeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
