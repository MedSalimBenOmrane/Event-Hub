import { TestBed } from '@angular/core/testing';

import { AfficheService } from './affiche.service';

describe('AfficheService', () => {
  let service: AfficheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfficheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
