import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingmapComponent } from './landingmap.component';

describe('LandingmapComponent', () => {
  let component: LandingmapComponent;
  let fixture: ComponentFixture<LandingmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
