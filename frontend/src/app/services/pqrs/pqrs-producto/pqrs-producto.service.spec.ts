import { TestBed } from '@angular/core/testing';

import { PqrsProductoService } from './pqrs-producto.service';

describe('PqrsProductoService', () => {
  let service: PqrsProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqrsProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
