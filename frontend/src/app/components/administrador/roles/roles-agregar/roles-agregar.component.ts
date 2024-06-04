import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../../services/accesos/roles.service';

@Component({
  selector: 'app-roles-agregar',
  templateUrl: './roles-agregar.component.html',
  styleUrl: './roles-agregar.component.css'
})
export class RolesAgregarComponent {
  get rol_nombre (){
    return this.formRoles.get('rol_nombre') as FormControl
  }

  formRoles = new FormGroup({
    'rol_nombre': new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  public loading: boolean | any;


  constructor(private _rolesService: RolesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  AgregarRol() {
    this.spinner.show()
    this.loading = true;

    const body = {
      rol_nombre: this.rol_nombre.value
    }

    this._rolesService.postRoles(body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Rol ${this.rol_nombre.value} agregado exitosamente`, `Registro Rol`);
      this.router.navigate([`/Roles`]);
      this.spinner.hide();
    },
    (error) => {
      this.toastr.error(`Error al registrar el rol`, `Error`)
      this.loading = false;
      this.spinner.hide();
    })
  }
}
