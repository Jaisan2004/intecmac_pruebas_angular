import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModulosService } from '../../../../services/accesos/modulos.service';


@Component({
  selector: 'app-modulos-agregar',
  templateUrl: './modulos-agregar.component.html',
  styleUrl: './modulos-agregar.component.css'
})
export class ModulosAgregarComponent {
  get mod_nombre (){
    return this.formModulos.get('mod_nombre') as FormControl
  }

  formModulos = new FormGroup({
    'mod_nombre': new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  public loading: boolean | any;

  mod_id:any;
  title: string = '';
  redireccionar: string = ``;

  componente: boolean = false;


  constructor(private _modulosService: ModulosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.mod_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.componentOrModule(this.mod_id);
  }

  componentOrModule(mod_id:any){
    if(mod_id == null){
      this.title = 'Modulo';
      this.redireccionar = `/Modulos`
      this.componente = false;
    }else{
      this.title = 'Componente';
      this.redireccionar = `/Componentes/${mod_id}`
      this.componente = true;
    }
  }

  AgregarModulo() {
    this.spinner.show()
    this.loading = true;
    let body;

    if(this.componente){
      body = {
        mod_nombre: this.mod_nombre.value,
        mod_id_padre: this.mod_id
      }
    }else{
      body = {
        mod_nombre: this.mod_nombre.value
      }
    }

    this._modulosService.postModulos(body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`${this.title} ${this.mod_nombre.value} agregado exitosamente`, `Registro Rol`);
      this.router.navigate([`${this.redireccionar}`]);
      this.spinner.hide();
    },
    (error) => {
      this.toastr.error(`Error al registrar el modulo`, `Error`);
      this.loading = false;
      this.spinner.hide();
    })
  }
}
