import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../services/error/error.service';
import { ModulosService } from '../../../../services/accesos/modulos.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  data: any;
  dataCliente: any;
  mod_id:any;
  title: string = '';
  noData: string = '';
  modificar: string = '';

  componente: boolean = false;

  temp: any;

  columns: any[] = [
    { name: '#', prop: 'mod_id' },
    { name: 'Nombre', prop: 'mod_nombre' },
  ];


  pqrs_id: any;


  displayedColumns: string[] = ['#',
    'Nombre',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _modulosService: ModulosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    this.mod_id = this.activatedRoute.snapshot.paramMap.get('id');

    this.componentOrModule(this.mod_id);
  }

  componentOrModule(mod_id:any){
    if(mod_id == null){
      this.title = 'Modulos';
      this.noData = 'No Existen Modulo en la Base de Datos';
      this.modificar = '/ModificarModulos';
      this.componente = false;
      this.getListModulo();
    }else{
      this.title = 'Componentes';
      this.noData = 'No Existen Componentes para este modulo en la Base de Datos'
      this.modificar = '/ModificarComponentes';
      this.componente = true;
      this.getListComponente();
    }
  }


  getListModulo() {
    this.spinner.show();
    this._modulosService.getModulos().subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    },
    (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
      this.spinner.hide()
    });
  }

  getListComponente(){
    this.spinner.show();
    this._modulosService.getComponentes(this.mod_id).subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    },
    (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
      this.spinner.hide()
    });
  }

  botonActualizar(){
    if(this.mod_id == null){
      this.getListModulo();
    }else{
      this.getListComponente();
    }
  }

  botonAgregar(){
    if(this.componente){
      this.router.navigate([`/AgregarComponentes/${this.mod_id}`]);
    }else{
      this.router.navigate([`/AgregarModulos`]);
    }
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.mod_nombre.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.dataSource.data = temp;
  }
}
