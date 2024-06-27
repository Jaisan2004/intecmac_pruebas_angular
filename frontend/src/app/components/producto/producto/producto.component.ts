import { Component, ViewChild } from '@angular/core';
import { ProductoService } from '../../../services/producto/producto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  data: any;
  dataCliente: any;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'prod_id' },
    { name: 'Ref.', prop: 'prod_ref' },
    { name: 'Descripción', prop: 'prod_descripcion' },
    { name: 'Presentación', prop: 'prod_presentacion' },
    { name: 'prod_und_vta_x_carton', prop: 'prod_und_vta_x_carton' },
    { name: 'iva', prop: 'prod_iva' },
  ];


  pqrs_id: any;

  displayedColumns: string[] = ['#', 
    'Ref.',
    'Descripción',
    'Presentación',
    'prod_und_vta_x_carton',
    'iva',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _productosService: ProductoService,
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
    this.getListProducto();
  }


  getListProducto() {
    this.spinner.show();
    this._productosService.getProductos().subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.prod_descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }
}
