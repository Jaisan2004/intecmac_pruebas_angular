import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormulariosService } from '../../../../services/formularios/formularios.service';
import { UsuariosService } from '../../../../services/accesos/usuarios.service';
import { RolesService } from '../../../../services/accesos/roles.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrl: './agregar-usuario.component.css'
})
export class AgregarUsuarioComponent {
  get username (){
    return this.formUsuarios.get('username') as FormControl
  }
  
  get carg_id (){
    return this.formUsuarios.get('carg_id') as FormControl
  }

  get usu_contrasena (){
    return this.formUsuarios.get('usu_contrasena') as FormControl
  }

  get rol_id (){
    return this.formUsuarios.get('rol_id') as FormControl
  }

  formUsuarios = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'carg_id': new FormControl('', Validators.required),
    'usu_contrasena': new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(300), Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[^a-z0-9]).*')]),
    'rol_id': new FormControl('', Validators.required),
  });

  public loading: boolean | any;

  carg_correo: any;
  contadorDes = 0;
  contadorObs = 0;

  dataCargos: any;
  dataRoles: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _usuariosService: UsuariosService,
    private _rolesService: RolesService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCargosOption();
    this.getRolesOption();
  }

  AgregarUsuario() {
    this.spinner.show()
    this.loading = true;

    const body = {
      username: this.username.value,
      carg_id: this.carg_id.value,
      usu_contrasena: this.usu_contrasena.value,
      rol_id: this.rol_id.value,
    }

    this._usuariosService.postUsuarios(body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Usuario ${this.username.value} agregado exitosamente`, `Registro Usuario`);
      this.router.navigate([`/Usuarios`]);
      this.spinner.hide();
    },
    (error) => {
      this.toastr.error(`Error al registrar el cliente`, `Error`)
      this.loading = false;
      this.spinner.hide();
    })
  }

  onKeyDescripcion(event: any) {
    this.contadorDes = event.target.value.length
  }

  onKeyDireccion(event: any) {
    this.contadorObs = event.target.value.length
  }

  getCargosOption() {
    this._formulariosService.getCargosOpcion().subscribe((data) => {
      this.dataCargos = data;
    })
  }

  getRolesOption() {
    this._rolesService.getRoles().subscribe((data) => {
      this.dataRoles = data;
    })
  }

}
