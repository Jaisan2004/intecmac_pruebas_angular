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
    { name: '#', titulo: '#',prop: 'pqrs_id' },
    { name: 'Fecha Recepción', titulo: 'Fecha Recepción',prop: 'pqrs_fecha_recepcion' },
    { name: 'Cliente', titulo: 'Cliente',prop: 'cli_nombre' },
    { name: 'Zona', titulo: 'Zona',prop: 'zona' },
    { name: 'Asesor', titulo: 'Asesor',prop: 'cli_asesor_nombre' },
    { name: 'Producto', titulo: 'Producto',prop: 'prod_descripcion' },
    { name: 'Lote', titulo: 'Lote',prop: 'pqrs_lote' },
    { name: 'Cantidad', titulo: 'Cantidad',prop: 'pqrs_prod_cantidad' },
    { name: 'Documento', titulo: 'Documento',prop: 'pqrs_doc' },
    { name: 'descripcion', titulo: 'Descripción',prop: 'pqrs_descripcion' },
    { name: 'Analisis', titulo: 'Analisis',prop: 'pqrs_analisis' },
    { name: 'Costo', titulo: 'Costo',prop: 'costo' },
    { name: 'Causa Raíz', titulo: 'Causa Raíz',prop: 'pcr_causa' },
    { name: 'Cargo Generador', titulo: 'Cargo Generador',prop: 'carg_nombre' },
    { name: 'Tipologia', titulo: 'Tipologia',prop: 'pt_tipologia' },
    { name: 'Fecha Respuesta', titulo: 'Fecha Respuesta',prop: 'pqrs_fecha_respuesta' },
    { name: 'Doc. Cruce', titulo: 'Doc. Cruce',prop: 'pqrs_documento_cruce' }
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
    'descripcion',
    'Evidencia',
    'Analisis',
    'Costo',
    'Causa Raíz',
    'Cargo Generador',
    'Tipologia',
    'Fecha Respuesta',
    'Días Gestión',
    'Doc. Cruce',
    'estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _pqrsService: PqrsService) { }

  image: any;
  data: any;
  temp: any;

  fecha_actual= new Date();

  isLoadingResults = true;

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    
    this.getListPqrs();

    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }

  getListPqrs() {
    this._pqrsService.getListPqrs().subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data]
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

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d: any) {
      return d.cli_nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }
}
