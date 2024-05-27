import { TestBed } from '@angular/core/testing';

import { ClienteClasificacionService } from './cliente-clasificacion.service';

describe('ClienteClasificacionService', () => {
  let service: ClienteClasificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteClasificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
