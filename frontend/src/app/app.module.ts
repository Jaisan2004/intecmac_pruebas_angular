import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PqrsComponent } from './components/pqrs/pqrs/pqrs.component';
import { AgregarPqrsComponent } from './components/pqrs/pqrs-agregar/agregar-pqrs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModificarPqrsComponent } from './components/pqrs/pqrs-modificar/modificar-pqrs.component';
import { PlanAccionComponent } from './components/pqrs/plan-accion/plan-accion.component';
import { PlanAccionAgregarComponent } from './components/pqrs/plan-accion-agregar/plan-accion-agregar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { PlanAccionModificarComponent } from './components/pqrs/plan-accion-modificar/plan-accion-modificar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSortModule } from '@angular/material/sort';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClienteComponent } from './components/cliente/cliente/cliente.component';
import { ClienteAgregarComponent } from './components/cliente/cliente-agregar/cliente-agregar.component';
import { ClienteModificarComponent } from './components/cliente/cliente-modificar/cliente-modificar.component';


@NgModule({
  declarations: [
    AppComponent,
    PqrsComponent,
    AgregarPqrsComponent,
    ModificarPqrsComponent,
    PlanAccionComponent,
    PlanAccionAgregarComponent,
    PlanAccionModificarComponent,
    ClienteComponent,
    ClienteAgregarComponent,
    ClienteModificarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
