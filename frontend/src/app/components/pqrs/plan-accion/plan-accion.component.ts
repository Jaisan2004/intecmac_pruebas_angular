import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { PlanAccionService } from '../../../services/pqrs/plan-accion/plan-accion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-plan-accion',
  templateUrl: './plan-accion.component.html',
  styleUrl: './plan-accion.component.css'
})
export class PlanAccionComponent {

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  rows: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'ppa_id' },
    { name: 'Fecha Inicio', prop: 'ppa_fecha_inicio' },
    { name: 'Descripcion Plan', prop: 'ppa_descripcion' },
    { name: 'Fecha del Cumplimiento', prop: 'ppa_fecha_cumplimiento' },
    { name: 'Persona a cargo', prop: 'carg_nombre' },
    { name: 'Descripción PQRS', prop: 'pqrs_descripcion' },
  ];


  pqrs_id: any;


  displayedColumns: string[] = ['#', 'Fecha Inicio', 'Descripcion Plan',
    'Fecha del Cumplimiento',
    'Persona a cargo',
    'Descripción PQRS',
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _planAccion: PlanAccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    
  }

  ngOnInit(): void {
    this.pqrs_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getListPqrsPlan();
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }


  getListPqrsPlan() {
    this.isLoadingResults = true;
    this._planAccion.getListPqrsPlan(this.pqrs_id).subscribe((data: any) => {
      this.isLoadingResults = false;
      this.dataSource.data = data;
      this.temp = [...data]
    });
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
