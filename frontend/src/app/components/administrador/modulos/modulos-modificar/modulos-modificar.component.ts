import { Component, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModulosService } from '../../../../services/accesos/modulos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RutasService } from '../../../../services/accesos/rutas.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../aplicacion/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modulos-modificar',
  templateUrl: './modulos-modificar.component.html',
  styleUrl: './modulos-modificar.component.css'
})
export class ModulosModificarComponent {

  columns: any[] = [
    { name: 'Ruta', titulo: 'Ruta', prop: 'ruta_nombre' },
    { name: 'Descripción', titulo: 'Descripción', prop: 'ruta_descripcion' }
  ];

  displayedColumns: string[] = [
    'Ruta',
    'Descripción',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get mod_id() {
    return this.formModulos.get('mod_id') as FormControl
  }

  get mod_nombre() {
    return this.formModulos.get('mod_nombre') as FormControl
  }

  get mod_id_padre() {
    return this.formModulos.get('mod_id_padre') as FormControl
  }

  formModulos = new FormGroup({
    'mod_id': new FormControl({ value: '', disabled: true }),
    'mod_nombre': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'mod_id_padre': new FormControl({ value: '', disabled: true })
  });

  get ruta_id() {
    return this.formRutas.get('ruta_id') as FormControl
  }
  get ruta_nombre() {
    return this.formRutas.get('ruta_nombre') as FormControl
  }

  get ruta_descripcion() {
    return this.formRutas.get('ruta_descripcion') as FormControl
  }
  formRutas = new FormGroup({
    'ruta_id': new FormControl({ value: '', disabled: true }),
    'ruta_nombre': new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    'ruta_descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)])
  });


  public loading: boolean | any;
  public rutaNuevo: boolean = false;
  public rutaModificar: boolean = false;

  title: string = '';
  redireccionar: string = ``;
  contadorDescripcion = 0;

  componente: boolean = false;

  temp: any;
  dataRuta: any;
  dataModulo: any;

  constructor(private _modulosService: ModulosService,
    private _rutasServices: RutasService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }


  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.mod_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.getModulo();
  }

  componentOrModule(mod_id: any) {
    if (mod_id == null) {
      this.title = 'Modulo';
      this.redireccionar = `/Modulos`
      this.componente = false;
    } else {
      this.title = 'Componente';
      this.redireccionar = `/Componentes/${mod_id}`
      this.componente = true;
      this.getRutas();
    }
  }

  modificarModulo() {
    this.spinner.show()
    this.loading = true;

    const body = {
      mod_nombre: this.mod_nombre.value
    }

    this._modulosService.updateModulo(this.mod_id.value, body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Modulo ${this.mod_nombre.value} actualizado exitosamente`, `Registro Rol`);
      this.router.navigate([`${this.redireccionar}`]);
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al actualizar el modulo`, `Error`);
        this.loading = false;
        this.spinner.hide();
      })
  }

  agregarRuta() {
    this.spinner.show();
    this.loading = true;

    const body = {
      ruta_nombre: this.ruta_nombre.value,
      ruta_descripcion: this.ruta_descripcion.value,
      mod_id: this.mod_id.value
    }

    this._rutasServices.postRuta(body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Ruta ${this.ruta_nombre.value} agregado exitosamente`, `Registro Ruta`);
      this.router.navigate([`/ModificarComponentes/${this.mod_id.value}`]);
      this.BotonCancelarRuta();
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al agregar la ruta`, `Error`);
        this.loading = false;
        this.spinner.hide();
      });
  }

  modificarRuta() {
    this.spinner.show();
    this.loading = true;

    const body = {
      ruta_nombre: this.ruta_nombre.value,
      ruta_descripcion: this.ruta_descripcion.value
    }

    this._rutasServices.updateRuta(this.ruta_id.value, body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Ruta ${this.ruta_nombre.value} modificada exitosamente`, `Actualización Ruta`);
      this.router.navigate([`/ModificarComponentes/${this.mod_id.value}`]);
      this.BotonCancelarRuta();
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al actualizar la ruta`, `Error`);
        this.loading = false;
        this.spinner.hide();
      });
  }

  getModulo() {
    this.spinner.show();

    this._modulosService.getModulo(this.mod_id.value).subscribe((data: any) => {
      this.dataModulo = data;
      this.mod_nombre.setValue(this.dataModulo.mod_nombre);
      this.mod_id_padre.setValue(this.dataModulo.mod_id_padre);
      this.componentOrModule(this.mod_id_padre.value);
      this.spinner.hide();
    })

  }

  getRutas() {
    this.spinner.show();

    this._rutasServices.getRutasByComponente(this.mod_id.value).subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    })
  }

  getRuta(ruta_id: any) {
    this.spinner.show();

    this._rutasServices.getRuta(ruta_id).subscribe((data: any) => {
      this.dataRuta = data;
      this.ruta_id.setValue(ruta_id);
      this.ruta_nombre.setValue(this.dataRuta.ruta_nombre);
      this.ruta_descripcion.setValue(this.dataRuta.ruta_descripcion);
      this.rutaModificar = true;
      this.spinner.hide();
    })
  }

  deleteRuta(id:any) {
    this.spinner.show();
    this._rutasServices.deleteRuta(id).subscribe((data:any)=>{
      const mensaje = data.msg;
      this.toastr.warning(mensaje, 'Ruta Eliminada');
      this.spinner.hide();
    });
  }

  openDialog(ruta_id:any, ruta_nombre:any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      data: {title: 'Eliminación Ruta', mensaje: `Esta de acuerdo con eliminar la ruta: "${ruta_nombre}" del componente?`}
    });

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.deleteRuta(ruta_id);
      }else{
        this.toastr.info('La ruta no fue eliminada de componente', 'Cancelar Eliminación Ruta')
      }
    })
  }

  BotonAgregarRuta() {
    this.rutaModificar = false;
    this.rutaNuevo = true;
  }

  BotonModificarRuta(ruta_id: any) {
    this.rutaModificar = true;
    this.rutaNuevo = false;
    this.getRuta(ruta_id);
  }

  BotonCancelarRuta() {
    this.rutaModificar = false;
    this.rutaNuevo = false;
    this.ruta_id.setValue('');
    this.ruta_nombre.setValue('');
    this.ruta_descripcion.setValue('');
  }

  onKeyDescripcion(event: any) {
    this.contadorDescripcion = event.target.value.length
  }

}
