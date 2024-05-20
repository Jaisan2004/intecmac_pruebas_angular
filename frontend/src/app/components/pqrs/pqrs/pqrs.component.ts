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


@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
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

  get cliente(){
    return this.formFiltros.get('cliente') as FormControl
  }

  get estado() {
    return this.formFiltros.get('estado') as FormControl
  }

  formFiltros = new FormGroup({
    'cliente': new FormControl(''),
    'estado': new FormControl(''),

  });


  constructor(private _pqrsService: PqrsService,
    private _pqrsProductoService: PqrsProductoService, 
    private spinner: NgxSpinnerService) { }

  image: any;
  data: any;
  dataProducto: any;
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

    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  getPqrsProducto(pqrs_id: any, row: any){
    this.expandedElement = this.expandedElement === row ? null : row;
    this._pqrsProductoService.getProductosPqrs(pqrs_id).subscribe((data)=>{
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
    const cli = this.cliente.value.toLowerCase();
    const est = this.estado.value;
    if(cli||est){
      if(est== 0){
        const temp = this.temp.filter((d: any)=>d.cli_nombre.toLowerCase().indexOf(cli) !== -1 || !cli);
        this.dataSource.data = temp;
      }else{
        const temp = this.temp.filter((d: any)=>d.cli_nombre.toLowerCase().indexOf(cli) !== -1 || !cli);
        const temp2 = temp.filter((d:any)=>d.pqrs_estado == est || !est);
        this.dataSource.data = temp2;
      }
    }
    // const temp = this.temp.filter(function (d: any) {
    //   return d.cli_nombre.toLowerCase().indexOf(cli) !== -1 || !cli;
    // });

    
  }

  updateFilterEstado() {
    const val = this.estado.value;
    if(val==0){
      this.getListPqrs();
    }else{
      const temp = this.temp.filter((d:any) => d.pqrs_estado == val || !val);
      this.dataSource.data = temp;
    }
    
  }
}
