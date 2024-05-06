import { Component, ViewChild } from '@angular/core';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  columns: any[] = [
    { name: '#', prop: 'pqrs_id' },
    { name: 'Fecha Recepcion', prop: 'pqrs_fecha_recepcion' },
    { name: 'Cliente', prop: 'cli_nombre' },
    { name: 'Zona', prop: 'cli_zona' },
    { name: 'Asesor', prop: 'cli_asesor_nombre' },
    { name: 'Producto', prop: 'prod_descripcion' },
    { name: 'Lote', prop: 'pqrs_lote' },
    { name: 'Cantidad', prop: 'pqrs_prod_cantidad' },
    { name: 'Documento', prop: 'pqrs_doc' },
    { name: 'Descripcion', prop: 'pqrs_descripcion' },
    { name: 'Analisis', prop: 'pqrs_analisis' },
    { name: 'Costo', prop: 'costo' },
    { name: 'Causa Raiz', prop: 'pcr_causa' },
    { name: 'Cargo Generador', prop: 'carg_nombre' },
    { name: 'Tipologia', prop: 'pt_tipologia' },
    { name: 'Fecha Respuesta', prop: 'pqrs_fecha_respuesta' },
    { name: 'Dias Gestion', prop: 'pqrs_dias_gestion' },
    { name: 'Doc. Cruce', prop: 'pqrs_documento_cruce' },
  ];

  displayedColumns: string[] = [
    '#',
    'Fecha Recepcion',
    'Cliente',
    'Zona',
    'Asesor',
    'Producto',
    'Lote',
    'Cantidad',
    'Documento',
    'Descripcion',
    'Analisis',
    'Costo',
    'Causa Raiz',
    'Cargo Generador',
    'Tipologia',
    'Fecha Respuesta',
    'Dias Gestion',
    'Doc. Cruce',
    'Evidencia',
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _pqrsService: PqrsService) { }

  image: any;
  data: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getListPqrs();
  }

  getListPqrs() {
    this._pqrsService.getListPqrs().subscribe((data: any) => {
      this.dataSource.data = data;

    });
  }

  // getImageUrl(evidencia: string) {
  //   const newUrl = `${evidencia}?t=${new Date().getTime()}`;
  //   return newUrl;
  // }

  // updateFilter(event: any) {
  //   const val = event.target.value.toLowerCase();
  //   this.rows = this.temp.filter((d: any) => d.cli_nombre.toLowerCase().indexOf(val)!== -1 ||!val);
  //   this.table.offset = 0;
  // }
}
