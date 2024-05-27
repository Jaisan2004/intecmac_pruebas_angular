import { TestBed } from '@angular/core/testing';

import { ClienteCiudadService } from './cliente-ciudad.service';

describe('ClienteCiudadService', () => {
  let service: ClienteCiudadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteCiudadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
