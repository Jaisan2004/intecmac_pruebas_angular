import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteModificarComponent } from './cliente-modificar.component';

describe('ClienteModificarComponent', () => {
  let component: ClienteModificarComponent;
  let fixture: ComponentFixture<ClienteModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
