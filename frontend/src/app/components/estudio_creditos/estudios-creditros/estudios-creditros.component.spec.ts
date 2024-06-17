import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosCreditrosComponent } from './estudios-creditros.component';

describe('EstudiosCreditrosComponent', () => {
  let component: EstudiosCreditrosComponent;
  let fixture: ComponentFixture<EstudiosCreditrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudiosCreditrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudiosCreditrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
