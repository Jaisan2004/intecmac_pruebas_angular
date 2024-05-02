import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './components/pqrs/pqrs/pqrs.component';
import { AgregarPqrsComponent } from './components/pqrs/pqrs-agregar/agregar-pqrs.component';
import { ModificarPqrsComponent } from './components/pqrs/pqrs-modificar/modificar-pqrs.component';
import { PlanAccionComponent } from './components/pqrs/plan-accion/plan-accion.component';
import { PlanAccionAgregarComponent } from './components/pqrs/plan-accion-agregar/plan-accion-agregar.component';

const routes: Routes = [
  {path: '', redirectTo: '/PQRS', pathMatch: 'full'},
  {path: "PQRS", component: PqrsComponent},
  {path: "agregarPqrs", component: AgregarPqrsComponent},
  {path: "modificarPqrs/:id", component: ModificarPqrsComponent},
  {path: "planAccionPqrs/:id", component: PlanAccionComponent},
  {path: "AgregarplanAccionPqrs/:id", component: PlanAccionAgregarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
