import { Component, ViewChild } from '@angular/core';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { PqrsProductoService } from '../../../services/pqrs/pqrs-producto/pqrs-producto.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExportExcelService } from '../../../services/export-excel/export-excel.service';


@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PqrsComponent {

  columns: any[] = [
    { name: '#', titulo: '#', prop: 'pqrs_id' },
    { name: 'Fecha Recepción', titulo: 'Fecha Recepción', prop: 'pqrs_fecha_recepcion' },
    { name: 'Cliente', titulo: 'Cliente', prop: 'cli_nombre' },
    { name: 'Zona', titulo: 'Zona', prop: 'zona' },
    { name: 'Asesor', titulo: 'Asesor', prop: 'cli_asesor_nombre' },
    { name: 'Documento', titulo: 'Documento', prop: 'pqrs_doc' },
    { name: 'descripcion', titulo: 'Descripción', prop: 'pqrs_descripcion' },
    { name: 'Analisis', titulo: 'Analisis', prop: 'pqrs_analisis' },
    { name: 'Costo', titulo: 'Costo', prop: 'costo' },
    { name: 'Causa Raíz', titulo: 'Causa Raíz', prop: 'pcr_causa' },
    { name: 'Cargo Generador', titulo: 'Cargo Generador', prop: 'carg_nombre' },
    { name: 'Tipologia', titulo: 'Tipologia', prop: 'pt_tipologia' },
    { name: 'Fecha Respuesta', titulo: 'Fecha Respuesta', prop: 'pqrs_fecha_respuesta' },
    { name: 'Doc. Cruce', titulo: 'Doc. Cruce', prop: 'pqrs_documento_cruce' }
  ];

  displayedColumns: string[] = [
    '#',
    'Fecha Recepción',
    'Cliente',
    'Zona',
    'Asesor',
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
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expandedElement: any;

  get filtroSelect() {
    return this.formFiltros.get('filtroSelect') as FormControl
  }

  get filtros() {
    return this.formFiltros.get('filtros') as FormControl
  }

  get fecha_recepcion_inicio() {
    return this.formFiltros.get('fecha_recepcion_inicio') as FormControl
  }

  get fecha_recepcion_fin() {
    return this.formFiltros.get('fecha_recepcion_fin') as FormControl
  }

  get estado() {
    return this.formFiltros.get('estado') as FormControl
  }

  formFiltros = new FormGroup({
    'filtroSelect': new FormControl(''),
    'filtros': new FormControl(''),
    'fecha_recepcion_inicio': new FormControl(''),
    'fecha_recepcion_fin': new FormControl(''),
    'estado': new FormControl(''),
  });


  constructor(private _pqrsService: PqrsService,
    private _pqrsProductoService: PqrsProductoService,
    private _exportExcelService: ExportExcelService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  image: any;
  data: any;
  dataProducto: any;
  placeholderFiltro: string = 'Filtrar por Cliente';
  campoFiltro: string = 'cli_nombre';
  temp: any;

  selectEstado: number = 0;
  fecha_actual = new Date();


  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getListPqrs();

    this.filtroSelect.setValue('2');

    this.estado.setValue(0);

    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  getPqrsProducto(pqrs_id: any, row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
    this._pqrsProductoService.getProductosPqrs(pqrs_id).subscribe((data) => {
      this.dataProducto = data
    })
  }

  getListPqrs() {
    this.spinner.show();
    this._pqrsService.getListPqrs().subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data]
      this.spinner.hide();
    });
  }

  exportAsXLSX(){
    const fileName:string = 'PQRS';
    this._exportExcelService.exportToExcel(this.dataSource.data,fileName);
  }

  borrarFiltros() {
    this.placeholderFiltro = 'Filtrar por Cliente';
    this.filtroSelect.setValue('2');
    this.filtros.setValue('');
    this.fecha_recepcion_fin.setValue(0);
    this.fecha_recepcion_inicio.setValue(0);
    this.estado.setValue(0);
    this.getListPqrs();
  }

  placeholderFiltroTexto(option: any) {
    switch (option) {
      case '1':
        this.placeholderFiltro = 'Filtrar por el Numero de PQRS';
        this.campoFiltro = 'pqrs_id';
        break;
      case '2':
        this.placeholderFiltro = 'Filtrar por Cliente';
        this.campoFiltro = 'cli_nombre';
        break;
      case '3':
        this.placeholderFiltro = 'Filtrar por Asesor';
        this.campoFiltro = 'cli_asesor_nombre';
        break;
      case '4':
        this.placeholderFiltro = 'Filtrar por Documento';
        this.campoFiltro = 'pqrs_doc';
        break;
      case '5':
        this.placeholderFiltro = 'Filtrar por Causa Raíz';
        this.campoFiltro = 'pcr_causa';
        break;
      case '6':
        this.placeholderFiltro = 'Filtrar por Cargo Generador';
        this.campoFiltro = 'carg_nombre';
        break;
      case '7':
        this.placeholderFiltro = 'Filtrar por Tipología';
        this.campoFiltro = 'pt_tipologia'
        break;
      default:
        this.placeholderFiltro = 'No hay filtro';
        break;
    }
  }

  diasProceso(fecha_recepcion: any, fecha_respuesta: any) {
    if (fecha_respuesta === '0000-00-00') {
      const dbFechaRecepcion = new Date(fecha_recepcion.replace(/-/g, '/'));
      const diff = moment(this.fecha_actual).diff(moment(dbFechaRecepcion), 'days');
      return diff
    } else {
      const dbFechaRecepcion = new Date(fecha_recepcion.replace(/-/g, '/'));
      const dbFechaRespuesta = new Date(fecha_respuesta.replace(/-/g, '/'));
      const diff = moment(dbFechaRespuesta).diff(moment(dbFechaRecepcion), 'days');
      return diff
    }
  }

  updateFilter() {
    const filtro = this.filtros.value.toLowerCase();
    const est = this.estado.value;
    const val = this.campoFiltro;
    const fecha_inicio = this.fecha_recepcion_inicio.value;
    const fecha_fin = this.fecha_recepcion_fin.value;

    const arreglo = filtro.split(", ");

    if (filtro || est || fecha_inicio || fecha_fin) {
      if (est == 0) {
        if (filtro) {
          const temp = this.temp.filter((d: any) => {
            return arreglo.some((element: any) => {
              return d[val].toString().toLowerCase().indexOf(element)!== -1;
            }) ||!filtro;
          });
          if (fecha_inicio || fecha_fin) {
            if (fecha_fin) {
              const temp2 = temp.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio && d.pqrs_fecha_recepcion <= fecha_fin);
              this.dataSource.data = temp2;
            } else {
              const temp2 = temp.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio);
              this.dataSource.data = temp2;
            }
          } else {
            this.dataSource.data = temp;
          }
        } else if (fecha_inicio || fecha_fin) {
          if (fecha_fin) {
            const temp = this.temp.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio && d.pqrs_fecha_recepcion <= fecha_fin);
            this.dataSource.data = temp;
          } else {
            const temp = this.temp.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio);
            this.dataSource.data = temp;
          }
        } else {
          this.dataSource.data = this.temp;
        }
      } else {
        const temp = this.temp.filter((d: any) => d.pqrs_estado == est || !est);
        if (filtro) {
          const temp2 = this.temp.filter((d: any) => {
            return arreglo.some((element: any) => {
              return d[val].toString().toLowerCase().indexOf(element)!== -1;
            }) ||!filtro;
          });
          if (fecha_inicio || fecha_fin) {
            if (fecha_fin) {
              const temp3 = temp2.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio && d.pqrs_fecha_recepcion <= fecha_fin);
              this.dataSource.data = temp3;
            } else {
              const temp3 = temp2.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio);
              this.dataSource.data = temp3;
            }
          } else {
            this.dataSource.data = temp2;
          }
        } else if (fecha_inicio || fecha_fin) {
          if (fecha_fin) {
            const temp2 = temp.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio && d.pqrs_fecha_recepcion <= fecha_fin);
            this.dataSource.data = temp2;
          } else {
            const temp2 = temp.filter((d: any) => d.pqrs_fecha_recepcion >= fecha_inicio);
            this.dataSource.data = temp2;
          }
        } else {
          this.dataSource.data = temp;
        }
      }

    } else {
      this.getListPqrs();
    }
  }

}



