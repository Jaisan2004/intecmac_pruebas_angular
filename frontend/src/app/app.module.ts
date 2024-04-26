import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { PqrsComponent } from './components/pqrs/pqrs.component';
import { AgregarPqrsComponent } from './components/agregar-pqrs/agregar-pqrs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';



@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    PqrsComponent,
    AgregarPqrsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    Select2Module,
    errorTailorImports,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          require: 'Este campo es requerido',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
