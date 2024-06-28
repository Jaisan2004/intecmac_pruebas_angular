import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrioClienteAgregarComponent } from './barrio-cliente-agregar.component';

describe('BarrioClienteAgregarComponent', () => {
  let component: BarrioClienteAgregarComponent;
  let fixture: ComponentFixture<BarrioClienteAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarrioClienteAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarrioClienteAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
