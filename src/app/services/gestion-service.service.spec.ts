import { TestBed } from '@angular/core/testing';

import { GestionServiceService } from './gestion-service.service';

describe('GestionServiceService', () => {
  let service: GestionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
