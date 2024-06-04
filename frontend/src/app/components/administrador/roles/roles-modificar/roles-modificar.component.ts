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

@Component({
  selector: 'app-roles-modificar',
  templateUrl: './roles-modificar.component.html',
  styleUrl: './roles-modificar.component.css'
})
export class RolesModificarComponent {

  columns: any[] = [
    { name: 'Modulo', titulo: 'Modulo', prop: 'mod_nombre' },
    { name: 'Ruta', titulo: 'Ruta', prop: 'ruta_nombre' }
  ];

  displayedColumns: string[] = [
    'Modulo',
    'Ruta',
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

  get producto() {
    return this.formPermisos.get('producto') as FormControl
  }

  get lote() {
    return this.formPermisos.get('lote') as FormControl
  }

  get cantidad() {
    return this.formPermisos.get('cantidad') as FormControl
  }

  formPermisos = new FormGroup({
    'per_id': new FormControl({ value: '', disabled: true }),
    'producto': new FormControl('', Validators.required),
    'lote': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'cantidad': new FormControl('', [Validators.required, Validators.max(9999999)])
  });

  public loading: boolean | any;
  public permisosNuevo: boolean = false;
  public permisosModificar: boolean = false;

  temp: any;
  dataRol: any;

  constructor(private _rolesService: RolesService,
    private _permisosService: PermisosService,
    private _errorService: ErrorService,
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
    this.rol_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));

    this.getRol();
    this.getPermisos();
  }

  modificarRol() {
    this.spinner.show()
    this.loading = true;

    const body = {
      rol_nombre: this.rol_nombre.value
    }

    this._rolesService.updateRoles(this.rol_id.value,body).subscribe(() => {
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

  BotonAgregarPermisos() {
    this.permisosModificar = false;
    this.permisosNuevo = true;
  }

  BotonCancelarPermisos() {
    this.permisosModificar = false;
    this.permisosNuevo = false;
    this.producto.setValue('');
    this.lote.setValue('');
    this.cantidad.setValue('');
  }
}
