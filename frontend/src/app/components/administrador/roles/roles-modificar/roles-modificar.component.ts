import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../../services/accesos/roles.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PermisosService } from '../../../../services/accesos/permisos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../services/error/error.service';
import { ModulosService } from '../../../../services/accesos/modulos.service';
import { RutasService } from '../../../../services/accesos/rutas.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../aplicacion/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roles-modificar',
  templateUrl: './roles-modificar.component.html',
  styleUrl: './roles-modificar.component.css'
})
export class RolesModificarComponent {

  columns: any[] = [
    { name: 'Modulo', titulo: 'Modulo', prop: 'mod_nombre' },
    { name: 'Componente', titulo: 'Componente', prop: 'componente' },
    { name: 'Descripción', titulo: 'Descripción', prop: 'ruta_descripcion' },
    { name: 'Ruta', titulo: 'Ruta', prop: 'ruta_nombre' }
  ];

  displayedColumns: string[] = [
    'Modulo',
    'Componente',
    'Ruta',
    'Descripción',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get rol_id() {
    return this.formRoles.get('rol_id') as FormControl
  }

  get rol_nombre() {
    return this.formRoles.get('rol_nombre') as FormControl
  }

  formRoles = new FormGroup({
    'rol_id': new FormControl({ value: '', disabled: true }),
    'rol_nombre': new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  get per_id() {
    return this.formPermisos.get('per_id') as FormControl
  }

  get mod_id() {
    return this.formPermisos.get('mod_id') as FormControl
  }

  get componente() {
    return this.formPermisos.get('componente') as FormControl
  }

  get ruta_id() {
    return this.formPermisos.get('ruta_id') as FormControl
  }


  formPermisos = new FormGroup({
    'per_id': new FormControl({ value: '', disabled: true }),
    'mod_id': new FormControl('', Validators.required),
    'componente': new FormControl('', Validators.required),
    'ruta_id': new FormControl('', Validators.required),
  });

  public loading: boolean | any;
  public permisosNuevo: boolean = false;
  public permisosModificar: boolean = false;

  temp: any;
  dataPermiso: any;
  dataRol: any;
  dataModulos: any;
  dataComponentes: any;
  dataRutas: any;

  constructor(private _rolesService: RolesService,
    private _permisosService: PermisosService,
    private _modulosService: ModulosService,
    private _rutasServie: RutasService,
    private _errorService: ErrorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.rol_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));

    this.getRol();
    this.getModulos();
    this.getPermisos();
  }

  modificarRol() {
    this.spinner.show()
    this.loading = true;

    const body = {
      rol_nombre: this.rol_nombre.value
    }

    this._rolesService.updateRoles(this.rol_id.value, body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Rol ${this.rol_nombre.value} se modifico exitosamente`, `Actualización Rol`);
      this.router.navigate([`/Roles`]);
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al Modificar el rol`, `Error`)
        this.loading = false;
        this.spinner.hide();
      })
  }

  crearPermiso() {
    this.spinner.show()
    this.loading = true;

    const body = {
      rol_id: this.rol_id.value,
      ruta_id: this.ruta_id.value
    }

    this._permisosService.postPermiso(body).subscribe(() => {
      this.loading = false;
      this.BotonCancelarPermisos();
      this.toastr.success(`Permiso Agregado al rol ${this.rol_nombre.value} exitosamente`, `Registro Permiso`);
      this.router.navigate([`/ModificarRoles/${this.rol_id.value}`]);
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al Modificar el rol`, `Error`)
        this.loading = false;
        this.spinner.hide();
      })
  }

  modificarPermiso() {
    this.spinner.show()
    this.loading = true;

    const body = {
      rol_id: this.rol_id.value,
      ruta_id: this.ruta_id.value
    }

    this._permisosService.updatePermiso(this.per_id.value, body).subscribe(() => {
      this.loading = false;
      this.BotonCancelarPermisos();
      this.toastr.success(`Permiso Modificado en el rol ${this.rol_nombre.value} exitosamente`, `Modificación Permiso`);
      this.router.navigate([`/ModificarRoles/${this.rol_id.value}`]);
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al Modificar el rol`, `Error`)
        this.loading = false;
        this.spinner.hide();
      });
  }

  getRol() {
    this.spinner.show();
    this._rolesService.getRol(this.rol_id.value).subscribe((data: any) => {
      this.dataRol = data;
      this.rol_nombre.setValue(this.dataRol.rol_nombre);
      this.spinner.hide();
    },
      (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.spinner.hide()
      });
  }

  getPermisos() {
    this.spinner.show();
    this._permisosService.getPermisosByRol(this.rol_id.value).subscribe((data: any) => {
      this.dataSource.data = data;
      this.temp = [...data];
      this.spinner.hide();
    },
      (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.spinner.hide()
      });
  }

  getPermiso(per_id: any) {
    this.spinner.show();
    console.log(per_id)
    this._permisosService.getPermiso(per_id).subscribe((data: any) => {
      this.dataPermiso = data;
      this.per_id.setValue(this.dataPermiso[0].per_id);
      this.mod_id.setValue(this.dataPermiso[0].mod_id);
      this.getComponetes(this.mod_id.value);
      this.componente.setValue(this.dataPermiso[0].comp_id);
      this.getRutas(this.componente.value);
      this.ruta_id.setValue(this.dataPermiso[0].ruta_id);
      this.permisosModificar = true;
      this.spinner.hide();
    })
  }

  getModulos() {
    this.spinner.show();

    this._modulosService.getModulos().subscribe((data: any) => {
      this.dataModulos = data;
      this.spinner.hide();
    })
  }

  getComponetes(mod_id: any) {
    this.spinner.show();

    this._modulosService.getComponentes(mod_id).subscribe((data: any) => {
      this.dataComponentes = data;
      this.spinner.hide()
    })
  }

  getRutas(mod_id: any) {
    this.spinner.show();

    this._rutasServie.getRutasByComponente(mod_id).subscribe((data: any) => {
      this.dataRutas = data;
      this.spinner.hide();
    })
  }

  BotonAgregarPermisos() {
    this.permisosModificar = false;
    this.permisosNuevo = true;
  }

  BotonCancelarPermisos() {
    this.permisosModificar = false;
    this.permisosNuevo = false;
    this.mod_id.setValue('');
    this.ruta_id.setValue('');
  }

  openDialog(per_id: any, descripcion: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      data: { title: `Eliminar Permiso`, mensaje: `Seguro quiere eliminar el permiso que: "${descripcion}"` }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this._permisosService.deletePermiso(per_id).subscribe(() => {
          this.toastr.warning(`Permiso Eliminado en el rol ${this.rol_nombre.value} exitosamente`, `Eliminación Permiso`);
          this.router.navigate([`/ModificarRoles/${this.rol_id.value}`]);
          this.spinner.hide();
        })
      }
    })
  }
}
