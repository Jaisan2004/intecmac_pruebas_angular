import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadClientesAgregarComponent } from './ciudad-clientes-agregar.component';

describe('CiudadClientesAgregarComponent', () => {
  let component: CiudadClientesAgregarComponent;
  let fixture: ComponentFixture<CiudadClientesAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CiudadClientesAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadClientesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
