import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';

const routes: Routes = [
  {path: "tabla", component: DatatableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
