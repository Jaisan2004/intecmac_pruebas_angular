import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadClientesComponent } from './ciudad-clientes.component';

describe('CiudadClientesComponent', () => {
  let component: CiudadClientesComponent;
  let fixture: ComponentFixture<CiudadClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CiudadClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiudadClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
