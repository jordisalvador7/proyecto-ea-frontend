import { TestBed } from '@angular/core/testing';

import { InforaceService } from './inforace.service';

describe('InforaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InforaceService = TestBed.get(InforaceService);
    expect(service).toBeTruthy();
  });
});
