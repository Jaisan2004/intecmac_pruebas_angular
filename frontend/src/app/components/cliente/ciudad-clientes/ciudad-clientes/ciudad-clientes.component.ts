import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ClienteCiudadService } from '../../../../services/cliente/cliente-ciudad.service';

@Component({
  selector: 'app-ciudad-clientes',
  templateUrl: './ciudad-clientes.component.html',
  styleUrl: './ciudad-clientes.component.css'
})
export class CiudadClientesComponent {
  data: any;
  dataCliente: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'c_c_id' },
    { name: 'Nombre', prop: 'c_c_nombre' }
  ];


  pqrs_id: any;


  displayedColumns: string[] = ['#', 'Nombre', 'Acciones' ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _clienteCliudadService: ClienteCiudadService,
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
    this.getListCiudades();
  }


  getListCiudades() {
    this.spinner.show();
    this._clienteCliudadService.getClienteCiudades().subscribe((data: any) => {
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
      return d.c_c_nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }
}
