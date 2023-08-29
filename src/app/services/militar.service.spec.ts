import { TestBed } from '@angular/core/testing';

import { MilitarService } from './militar.service';

describe('MilitarService', () => {
  let service: MilitarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilitarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
