import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetNotFoundComponent } from './planet-not-found.component';

describe('PlanetNotFoundComponent', () => {
  let component: PlanetNotFoundComponent;
  let fixture: ComponentFixture<PlanetNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
