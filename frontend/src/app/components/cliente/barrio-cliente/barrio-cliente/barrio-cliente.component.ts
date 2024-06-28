import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteCiudadService } from '../../../../services/cliente/cliente-ciudad.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ClienteZonaService } from '../../../../services/cliente/cliente-zona.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barrio-cliente',
  templateUrl: './barrio-cliente.component.html',
  styleUrl: './barrio-cliente.component.css'
})
export class BarrioClienteComponent {
  data: any;
  dataCliente: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'cz_id' },
    { name: 'Nombre', prop: 'cz_nombre' }
  ];


  pqrs_id: any;

  c_c_id:any;
  displayedColumns: string[] = ['#', 'Nombre', 'Acciones' ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _clienteZonaService: ClienteZonaService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _errorService: ErrorService
  ) { }

  ngAfterViewInit() {
    this.c_c_id = this.activatedRoute.snapshot.paramMap.get('id');

    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.c_c_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getListBarrios();
  }


  getListBarrios() {
    this.spinner.show();
    this._clienteZonaService.getClienteZonasByCiudad(this.c_c_id).subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    },
    (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
      this.spinner.hide()
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.cz_nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }
}
