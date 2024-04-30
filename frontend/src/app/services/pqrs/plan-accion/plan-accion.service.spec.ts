import { TestBed } from '@angular/core/testing';

import { PlanAccionService } from './plan-accion.service';

describe('PlanAccionService', () => {
  let service: PlanAccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanAccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
