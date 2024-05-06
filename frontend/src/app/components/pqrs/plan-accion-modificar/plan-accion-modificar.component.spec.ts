import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAccionModificarComponent } from './plan-accion-modificar.component';

describe('PlanAccionModificarComponent', () => {
  let component: PlanAccionModificarComponent;
  let fixture: ComponentFixture<PlanAccionModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanAccionModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanAccionModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
