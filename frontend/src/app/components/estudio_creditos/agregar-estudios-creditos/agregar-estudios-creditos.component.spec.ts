import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEstudiosCreditosComponent } from './agregar-estudios-creditos.component';

describe('AgregarEstudiosCreditosComponent', () => {
  let component: AgregarEstudiosCreditosComponent;
  let fixture: ComponentFixture<AgregarEstudiosCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEstudiosCreditosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEstudiosCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
