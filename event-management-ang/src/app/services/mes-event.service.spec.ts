import { TestBed } from '@angular/core/testing';

import { MesEventService } from './mes-event.service';

describe('MesEventService', () => {
  let service: MesEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
