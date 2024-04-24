import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';
import { PqrsComponent } from './components/pqrs/pqrs.component';

const routes: Routes = [
  {path: "tabla", component: DatatableComponent},
  {path: "PQRS", component: PqrsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
