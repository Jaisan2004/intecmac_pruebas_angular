import { Component, ViewChild } from '@angular/core';
import { PlanAccionService } from '../../../services/pqrs/plan-accion.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PqrsService } from '../../../services/pqrs/pqrs.service';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-plan-accion',
  templateUrl: './plan-accion.component.html',
  styleUrl: './plan-accion.component.css'
})
export class PlanAccionComponent {

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  data: any;
  dataCliente: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'index' },
    { name: 'Fecha Inicio', prop: 'ppa_fecha_inicio' },
    { name: 'Descripcion Plan', prop: 'ppa_descripcion' },
    { name: 'Fecha del Cumplimiento', prop: 'ppa_fecha_cumplimiento' },
    { name: 'Cargo Responsable', prop: 'carg_nombre' },
    { name: 'Observaciones', prop: 'ppa_observaciones' }
  ];


  pqrs_id: any;


  displayedColumns: string[] = ['#', 'Fecha Inicio', 'Descripcion Plan',
    'Fecha del Cumplimiento',
    'Cargo Responsable',
    'Observaciones',
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _planAccion: PlanAccionService,
    private activatedRoute: ActivatedRoute,
    private _pqrsService: PqrsService,
    private _formulariosService: FormulariosService,
    private spinner: NgxSpinnerService
  ) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.pqrs_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPqrs();
    this.getListPqrsPlan();
  }


  getListPqrsPlan() {
    this.spinner.show();
    this._planAccion.getListPqrsPlan(this.pqrs_id).subscribe((data: any) => {
      this.dataSource.data = data.map((item: any, index: any) => ({ ...item, index: index + 1 }));
      this.temp = [...data]
      this.spinner.hide();
    });
  }

  getPqrs() {
    this._pqrsService.getPqrs(this.pqrs_id).subscribe((data) => {
      this.data = data;
      this.getInfoCliente(this.data.cli_id);
    })
  }

  getInfoCliente(cli_id: any) {
    this._formulariosService.getInfoCliente(cli_id).subscribe((data) => {
      this.dataCliente = data;
    })
  }

  envioInfoPqrs(){
    localStorage.setItem('cliente', JSON.stringify(this.dataCliente[0]));
    localStorage.setItem('pqrs', JSON.stringify(this.data));
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.carg_nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }


}
