import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PqrsComponent } from './components/pqrs/pqrs/pqrs.component';
import { AgregarPqrsComponent } from './components/pqrs/pqrs-agregar/agregar-pqrs.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
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
import { LoginComponent } from './components/aplicacion/login/login.component';
import { MenuComponent } from './components/aplicacion/menu/menu.component';
import { añadirTokenInterceptor } from './utils/añadir-token.interceptor';
import { NoPermisosComponent } from './components/aplicacion/no-permisos/no-permisos.component';
import { UsuarioComponent } from './components/administrador/usuario/usuario/usuario.component';
import { AgregarUsuarioComponent } from './components/administrador/usuario/agregar-usuario/agregar-usuario.component';
import { ModificarUsuarioComponent } from './components/administrador/usuario/modificar-usuario/modificar-usuario.component';
import { RolesComponent } from './components/administrador/roles/roles/roles.component';
import { RolesAgregarComponent } from './components/administrador/roles/roles-agregar/roles-agregar.component';
import { RolesModificarComponent } from './components/administrador/roles/roles-modificar/roles-modificar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/aplicacion/confirm-dialog/confirm-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ModulosComponent } from './components/administrador/modulos/modulos/modulos.component';
import { ModulosAgregarComponent } from './components/administrador/modulos/modulos-agregar/modulos-agregar.component';
import { ModulosModificarComponent } from './components/administrador/modulos/modulos-modificar/modulos-modificar.component';
import { ProductoComponent } from './components/producto/producto/producto.component';
import { AgregarProductoComponent } from './components/producto/agregar-producto/agregar-producto.component';
import { ModificarProductoComponent } from './components/producto/modificar-producto/modificar-producto.component';
import { EstudiosCreditrosComponent } from './components/estudio_creditos/estudios-creditros/estudios-creditros.component';
import { AgregarEstudiosCreditosComponent } from './components/estudio_creditos/agregar-estudios-creditos/agregar-estudios-creditos.component';
import { CiudadClientesComponent } from './components/cliente/ciudad-clientes/ciudad-clientes/ciudad-clientes.component';
import { CiudadClientesAgregarComponent } from './components/cliente/ciudad-clientes/ciudad-clientes-agregar/ciudad-clientes-agregar.component';
import { BarrioClienteComponent } from './components/cliente/barrio-cliente/barrio-cliente/barrio-cliente.component';
import { BarrioClienteAgregarComponent } from './components/cliente/barrio-cliente/barrio-cliente-agregar/barrio-cliente-agregar.component';

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
    ClienteModificarComponent,
    LoginComponent,
    MenuComponent,
    NoPermisosComponent,
    UsuarioComponent,
    AgregarUsuarioComponent,
    ModificarUsuarioComponent,
    RolesComponent,
    RolesAgregarComponent,
    RolesModificarComponent,
    ConfirmDialogComponent,
    ModulosComponent,
    ModulosAgregarComponent,
    ModulosModificarComponent,
    ProductoComponent,
    AgregarProductoComponent,
    ModificarProductoComponent,
    EstudiosCreditrosComponent,
    AgregarEstudiosCreditosComponent,
    CiudadClientesComponent,
    CiudadClientesAgregarComponent,
    BarrioClienteComponent,
    BarrioClienteAgregarComponent
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
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: añadirTokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
