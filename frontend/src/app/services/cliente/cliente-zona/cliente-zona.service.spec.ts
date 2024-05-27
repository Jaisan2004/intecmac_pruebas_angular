import { TestBed } from '@angular/core/testing';

import { ClienteZonaService } from './cliente-zona.service';

describe('ClienteZonaService', () => {
  let service: ClienteZonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteZonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
