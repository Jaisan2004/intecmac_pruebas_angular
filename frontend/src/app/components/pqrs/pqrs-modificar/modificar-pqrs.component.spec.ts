import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPqrsComponent } from './modificar-pqrs.component';

describe('ModificarPqrsComponent', () => {
  let component: ModificarPqrsComponent;
  let fixture: ComponentFixture<ModificarPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarPqrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
