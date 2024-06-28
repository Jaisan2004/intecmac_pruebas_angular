import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrioClienteComponent } from './barrio-cliente.component';

describe('BarrioClienteComponent', () => {
  let component: BarrioClienteComponent;
  let fixture: ComponentFixture<BarrioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarrioClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarrioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
