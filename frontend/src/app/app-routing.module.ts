import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './components/pqrs/pqrs/pqrs.component';
import { AgregarPqrsComponent } from './components/pqrs/pqrs-agregar/agregar-pqrs.component';
import { ModificarPqrsComponent } from './components/pqrs/pqrs-modificar/modificar-pqrs.component';
import { PlanAccionComponent } from './components/pqrs/plan-accion/plan-accion.component';
import { PlanAccionAgregarComponent } from './components/pqrs/plan-accion-agregar/plan-accion-agregar.component';
import { PlanAccionModificarComponent } from './components/pqrs/plan-accion-modificar/plan-accion-modificar.component';
import { ClienteComponent } from './components/cliente/cliente/cliente.component';
import { ClienteAgregarComponent } from './components/cliente/cliente-agregar/cliente-agregar.component';
import { ClienteModificarComponent } from './components/cliente/cliente-modificar/cliente-modificar.component';
import { LoginComponent } from './components/aplicacion/login/login.component';
import { autGuard } from './utils/aut.guard';
import { NoPermisosComponent } from './components/aplicacion/no-permisos/no-permisos.component';

const routes: Routes = [
  {path: '', redirectTo: '/Pqrs', pathMatch: 'full'},
  //Login
  {path: 'Login', component: LoginComponent},
  //Sin permisos
  {path: 'NoTienePermisos', component: NoPermisosComponent},
  //PQRS
  {path: "Pqrs", component: PqrsComponent, canActivate: [autGuard]},
  {path: "AgregarPqrs", component: AgregarPqrsComponent,canActivate: [autGuard]},
  {path: "ModificarPqrs/:id", component: ModificarPqrsComponent, canActivate: [autGuard]},
  //Planes de acción PQRS
  {path: "PlanAccionPqrs/:id", component: PlanAccionComponent,canActivate: [autGuard]},
  {path: "AgregarPlanAccionPqrs/:id", component: PlanAccionAgregarComponent,canActivate: [autGuard]},
  {path: "ModificarPlanAccionPqrs/:id", component: PlanAccionModificarComponent,canActivate: [autGuard]},
  //Clientes
  {path: "Clientes", component: ClienteComponent, canActivate: [autGuard]},
  {path: "AgregarClientes", component: ClienteAgregarComponent, canActivate: [autGuard]},
  {path: "ModificarClientes/:id", component: ClienteModificarComponent, canActivate: [autGuard]},
  {path: '**', component: PqrsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
