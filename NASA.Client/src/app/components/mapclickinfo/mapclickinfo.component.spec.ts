import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapclickinfoComponent } from './mapclickinfo.component';

describe('MapclickinfoComponent', () => {
  let component: MapclickinfoComponent;
  let fixture: ComponentFixture<MapclickinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapclickinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapclickinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
