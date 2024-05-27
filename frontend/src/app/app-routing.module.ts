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

const routes: Routes = [
  {path: '', redirectTo: '/PQRS', pathMatch: 'full'},
  //PQRS
  {path: "PQRS", component: PqrsComponent},
  {path: "agregarPqrs", component: AgregarPqrsComponent},
  {path: "modificarPqrs/:id", component: ModificarPqrsComponent},
  //Planes de acción PQRS
  {path: "planAccionPqrs/:id", component: PlanAccionComponent},
  {path: "AgregarPlanAccionPqrs/:id", component: PlanAccionAgregarComponent},
  {path: "ModificarPlanAccionPqrs/:id", component: PlanAccionModificarComponent},
  //Clientes
  {path: "Clientes", component: ClienteComponent},
  {path: "AgregarClientes", component: ClienteAgregarComponent},
  {path: "ModificarClientes/:id", component: ClienteModificarComponent},
  {path: '**', component: PqrsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
