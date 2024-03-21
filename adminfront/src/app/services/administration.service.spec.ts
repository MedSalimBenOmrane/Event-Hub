import { TestBed } from '@angular/core/testing';

import { AdministrationService } from './administration.service';

describe('CreatorsService', () => {
  let service: AdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
