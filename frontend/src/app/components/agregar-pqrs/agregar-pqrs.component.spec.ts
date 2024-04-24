import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPqrsComponent } from './agregar-pqrs.component';

describe('AgregarPqrsComponent', () => {
  let component: AgregarPqrsComponent;
  let fixture: ComponentFixture<AgregarPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarPqrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
