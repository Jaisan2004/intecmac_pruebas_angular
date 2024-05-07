import { Component, ViewChild } from '@angular/core';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';


@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  columns: any[] = [
    { name: '#', prop: 'pqrs_id' },
    { name: 'Fecha Recepción', prop: 'pqrs_fecha_recepcion' },
    { name: 'Cliente', prop: 'cli_nombre' },
    { name: 'Zona', prop: 'cli_zona' },
    { name: 'Asesor', prop: 'cli_asesor_nombre' },
    { name: 'Producto', prop: 'prod_descripcion' },
    { name: 'Lote', prop: 'pqrs_lote' },
    { name: 'Cantidad', prop: 'pqrs_prod_cantidad' },
    { name: 'Documento', prop: 'pqrs_doc' },
    { name: 'Descripción', prop: 'pqrs_descripcion' },
    { name: 'Analisis', prop: 'pqrs_analisis' },
    { name: 'Costo', prop: 'costo' },
    { name: 'Causa Raíz', prop: 'pcr_causa' },
    { name: 'Cargo Generador', prop: 'carg_nombre' },
    { name: 'Tipologia', prop: 'pt_tipologia' },
    { name: 'Fecha Respuesta', prop: 'pqrs_fecha_respuesta' },
    { name: 'Doc. Cruce', prop: 'pqrs_documento_cruce' }
  ];

  displayedColumns: string[] = [
    '#',
    'Fecha Recepción',
    'Cliente',
    'Zona',
    'Asesor',
    'Producto',
    'Lote',
    'Cantidad',
    'Documento',
    'Descripción',
    'Evidencia',
    'Analisis',
    'Costo',
    'Causa Raíz',
    'Cargo Generador',
    'Tipologia',
    'Fecha Respuesta',
    'Días Gestión',
    'Doc. Cruce',
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _pqrsService: PqrsService) { }

  image: any;
  data: any;

  fecha_actual= new Date();

  isLoadingResults = true;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getListPqrs();
  }

  getListPqrs() {
    this.isLoadingResults = true;
    this._pqrsService.getListPqrs().subscribe((data: any) => {
      this.isLoadingResults = false;
      this.dataSource.data = data;

    });
  }

  diasProceso(fecha_recepcion:any, fecha_respuesta: any){
    if(fecha_respuesta==='0000-00-00'){
    const dbFechaRecepcion = new Date(fecha_recepcion.replace(/-/g, '/'));
    const diff = moment(this.fecha_actual).diff(moment(dbFechaRecepcion), 'days');
    return diff
    }else{
      const dbFechaRecepcion = new Date(fecha_recepcion.replace(/-/g, '/'));
      const dbFechaRespuesta = new Date(fecha_respuesta.replace(/-/g, '/'));
      const diff = moment(dbFechaRespuesta).diff(moment(dbFechaRecepcion), 'days');
      return diff
    }
  }

  // updateFilter(event: any) {
  //   const val = event.target.value.toLowerCase();
  //   this.rows = this.temp.filter((d: any) => d.cli_nombre.toLowerCase().indexOf(val)!== -1 ||!val);
  //   this.table.offset = 0;
  // }
}
