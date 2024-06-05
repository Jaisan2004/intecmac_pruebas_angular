import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosModificarComponent } from './modulos-modificar.component';

describe('ModulosModificarComponent', () => {
  let component: ModulosModificarComponent;
  let fixture: ComponentFixture<ModulosModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulosModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
