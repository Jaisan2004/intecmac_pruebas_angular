import { Component, ViewChild } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  data: any;
  dataCliente: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'cli_id' },
    { name: 'Nombre', prop: 'cli_nombre' },
    { name: 'NIT', prop: 'cli_nit' },
    { name: 'Clasificación', prop: 'id_clasificacion' },
    { name: 'Dirección', prop: 'cli_direccion' },
    { name: 'Telefono', prop: 'cli_telefono' },
    { name: 'Dirección', prop: 'cli_direccion' },
    { name: 'Asesor', prop: 'cli_asesor_nombre' },
  ];


  pqrs_id: any;


  displayedColumns: string[] = ['#', 'Nombre', 'NIT',
    'Clasificación',
    'Dirección',
    'Telefono',
    'Asesor',
    'Estado',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
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
    this.getListCliente();
  }


  getListCliente() {
    this.spinner.show();
    this._clienteService.getCliente().subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    });
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
