import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './components/pqrs/pqrs.component';
import { AgregarPqrsComponent } from './components/pqrs/agregar-pqrs/agregar-pqrs.component';
import { ModificarPqrsComponent } from './components/pqrs/modificar-pqrs/modificar-pqrs.component';

const routes: Routes = [
  {path: '', redirectTo: '/PQRS', pathMatch: 'full'},
  {path: "PQRS", component: PqrsComponent},
  {path: "agregarPqrs", component: AgregarPqrsComponent},
  {path: "modificarPqrs/:id", component: ModificarPqrsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
