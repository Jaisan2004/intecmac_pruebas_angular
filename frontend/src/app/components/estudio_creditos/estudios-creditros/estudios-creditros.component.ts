import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error/error.service';
import { EstudioCreditosService } from '../../../services/estudio-creditos/estudio-creditos.service';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-estudios-creditros',
  templateUrl: './estudios-creditros.component.html',
  styleUrl: './estudios-creditros.component.css'
})
export class EstudiosCreditrosComponent {
  mode: ProgressBarMode = 'determinate';
  bufferValue = 0;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  data: any;
  dataCliente: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'cred_estu_id' },
    { name: 'Cliente', prop: 'cli_nombre' },
    { name: 'Tipo de Credito', prop: 'cred_tipo_nombre' },
    { name: 'Representante Ventas', prop: 'cli_asesor_nombre' },
    { name: 'Observaciones Comercial', prop: 'cred_obser_comercial' },
    { name: 'Cliente Desde', prop: 'cred_cliente_desde' },
    { name: 'Cupo Actual', prop: 'cred_cupo_actual' },
    { name: 'Plazo Pago', prop: 'cli_pp_sistema' },
    { name: 'Descuento Otorgado', prop: 'cred_descuento_otorgado' },
    { name: 'Fecha Solicitud', prop: 'fecha_solicitud' },
    { name: 'Verificacion Comercial', prop: 'fecha_comercial' },
    { name: 'Verificación Contabilidad', prop: 'fecha_contabilidad' },
    { name: 'Observaciones Contabilidad', prop: 'cred_obser_contabilidad' },
    { name: 'Fecha Gerencia', prop: 'fecha_gerencia' },
    { name: 'Plazo Pago Aprobado', prop: 'cred_plazo_aprobado' },
    { name: 'Cupo Aprobado', prop: 'cred_cupo_aprobado' },
    { name: 'Observaciones Gerencia', prop: 'cred_obser_gerencia' },
  ];


  pqrs_id: any;


  displayedColumns: string[] = ['#', 
    'Cliente', 
    'Tipo de Credito',
    'Representante Ventas',
    'Observaciones Comercial',
    'Cliente Desde',
    'Cupo Actual',
    'Plazo Pago',
    'Descuento Otorgado',
    'Fecha Solicitud', 
    'Verificacion Comercial',
    'Verificación Contabilidad',
    'Observaciones Contabilidad',
    'Fecha Gerencia',
    'Plazo Pago Aprobado',
    'Cupo Aprobado',
    'Observaciones Gerencia',
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _estudioCreditosServices: EstudioCreditosService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _errorService: ErrorService
  ) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.getListEstudiosCreditos();
  }


  getListEstudiosCreditos() {
    this.spinner.show();
    this._estudioCreditosServices.getCredEstudios().subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    },
    (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
      this.spinner.hide()
    });
  }

  porcentajeProceso(est_id:any){
    const porcentaje = est_id * 20;
    if(porcentaje>100){
      return 100
    }else{
      return porcentaje;
    }
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.cli_nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }
}