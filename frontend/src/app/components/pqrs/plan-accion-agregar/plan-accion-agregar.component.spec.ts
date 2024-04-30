import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAccionAgregarComponent } from './plan-accion-agregar.component';

describe('PlanAccionAgregarComponent', () => {
  let component: PlanAccionAgregarComponent;
  let fixture: ComponentFixture<PlanAccionAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanAccionAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanAccionAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
