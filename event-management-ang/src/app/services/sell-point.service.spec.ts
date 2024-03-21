import { TestBed } from '@angular/core/testing';

import { SellPointService } from './sell-point.service';

describe('SellPointService', () => {
  let service: SellPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
