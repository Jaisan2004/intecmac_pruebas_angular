import {Component, TemplateRef, ViewChild } from '@angular/core';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent{

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  @ViewChild('estadoPqrs', { static: true }) estadoPqrs!: TemplateRef<any>;
  @ViewChild('buttonAccion', { static: true }) buttonAccion!: TemplateRef<any>;

  rows:any;

  temp:any;

  columns:any;



  ColumnMode = ColumnMode;



  constructor(private _pqrsService: PqrsService) {}

  ngOnInit(): void {
    this.columns = [{ name: '#', prop: 'pqrs_id' }, { name: 'Fecha Recepcion', prop: 'pqrs_fecha_recepcion' }, { name: 'Cliente', prop: 'cli_nombre' },
    { name: 'Zona', prop: 'cli_zona' },{ name: 'Asesor', prop: 'cli_asesor_nombre' },{ name: 'Producto',prop: 'prod_descripcion' },
    { name: 'Lote', prop: 'pqrs_lote' },{ name: 'Cantidad', prop: 'pqrs_prod_cantidad' },{ name: 'Documento', prop: 'pqrs_doc' },
    { name: 'Descripcion', prop: 'pqrs_descripcion' },{ name: 'Analisis', prop: 'pqrs_analisis' },{ name: 'Costo', prop: 'costo' },
    { name: 'Causa Raiz', prop: 'pcr_causa' },{ name: 'Cargo Generador', prop: 'carg_nombre' },{ name: 'Tipologia', prop: 'pt_tipologia' },
    { name: 'Fecha Respuesta', prop: 'pqrs_fecha_respuesta' },{ name: 'Dias Gestion', prop: 'pqrs_dias_gestion' },{ name: 'Doc. Cruce',prop: 'pqrs_documento_cruce' },
    { name: 'Estado', prop: 'pe_estado', cellTemplate: this.estadoPqrs}, { name: 'Acciones', prop: 'acciones',cellTemplate: this.buttonAccion }];
      this.getListPqrs();
  }


    getListPqrs(){
      setTimeout(() => {
        this._pqrsService.getListPqrs().subscribe((data: any)=>{
          this.rows = data
          this.temp = [...data];
        });
      }, 500);
    }

    updateFilter(event: any) {
      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.temp.filter(function (d: any) {
        return d.cli_nombre.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
}
