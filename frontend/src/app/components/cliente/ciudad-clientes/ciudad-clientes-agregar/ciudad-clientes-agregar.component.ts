import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClienteCiudadService } from '../../../../services/cliente/cliente-ciudad.service';
import { error } from 'console';

@Component({
  selector: 'app-ciudad-clientes-agregar',
  templateUrl: './ciudad-clientes-agregar.component.html',
  styleUrl: './ciudad-clientes-agregar.component.css'
})
export class CiudadClientesAgregarComponent {
  get c_c_id (){
    return this.formCiudad.get('c_c_id') as FormControl
  }

  get c_c_nombre (){
    return this.formCiudad.get('c_c_nombre') as FormControl
  }

  formCiudad = new FormGroup({
    'c_c_id': new FormControl({value: '', disabled: true}),
    'c_c_nombre': new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  public loading: boolean | any;
  public ciudadCrear: boolean = false;
  public ciudadModificar: boolean = false;

  public title: string='';


  componente: boolean = false;


  constructor(private _clienteCiudadService: ClienteCiudadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.c_c_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));

    this.agregarOrModificarCiudad(this.c_c_id.value);
  }

  agregarOrModificarCiudad(id:any) {
    if(id==null){
      this.title = 'Agregar';
      this.ciudadCrear = true;
      this.ciudadModificar = false;
    }else{
      this.title = 'Modificar';
      this.ciudadCrear = false;
      this.ciudadModificar = true;
      this.traerCiudad(id);
    }
  }

  AgregarCiudad() {
    this.spinner.show()
    this.loading = true;

    const body = {
        c_c_nombre: this.c_c_nombre.value
      }

    this._clienteCiudadService.postClienteCiudad(body).subscribe((data) => {
      const mensaje = data.msg;
      this.loading = false;
      this.toastr.success(mensaje, `Registro Ciudad`);
      this.router.navigate(['/Ciudades']);
      this.spinner.hide();
    },
    (error) => {
      this.loading = false;
      this.spinner.hide();
    })
  }

  modificarCiudad() {
    this.spinner.show();
    this.loading = true;

    const body = {
       c_c_nombre: this.c_c_nombre.value
    }
    this._clienteCiudadService.updateClienteCiudad(this.c_c_id.value, body).subscribe((data:any)=>{
      const mensaje = data.msg;
      this.toastr.success(mensaje, 'Modificación Ciudad');
      this.loading = false;
      this.router.navigate(['/Ciudades']);
      this.spinner.hide();
    },
    (error)=>{
      this.loading = false;
      this.spinner.hide();
    })
  }

  traerCiudad(id:any) {
    this.spinner.show();
    this._clienteCiudadService.getClienteCiudad(id).subscribe((data:any)=>{
      const dataCiudad = data;
      this.c_c_nombre.setValue(dataCiudad.c_c_nombre);
      this.spinner.hide();
    })
  }
}
