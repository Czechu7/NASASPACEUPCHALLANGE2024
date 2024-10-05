import { TestBed } from '@angular/core/testing';

import { EonetServiceService } from './eonet-service.service';

describe('EonetServiceService', () => {
  let service: EonetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EonetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
