import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClienteClasificacionService } from '../../../services/cliente/cliente-clasificacion.service';
import { ClienteCiudadService } from '../../../services/cliente/cliente-ciudad.service';
import { ClienteZonaService } from '../../../services/cliente/cliente-zona.service';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-cliente-agregar',
  templateUrl: './cliente-agregar.component.html',
  styleUrl: './cliente-agregar.component.css'
})
export class ClienteAgregarComponent {
  get cli_nombre (){
    return this.formPqrs.get('cli_nombre') as FormControl
  }
  
  get cli_nit (){
    return this.formPqrs.get('cli_nit') as FormControl
  }

  get cli_clasificacion (){
    return this.formPqrs.get('cli_clasificacion') as FormControl
  }

  get cli_ciudad (){
    return this.formPqrs.get('cli_ciudad') as FormControl
  }

  get cli_zona (){
    return this.formPqrs.get('cli_zona') as FormControl
  }

  get cli_direccion (){
    return this.formPqrs.get('cli_direccion') as FormControl
  }

  get cli_telefono (){
    return this.formPqrs.get('cli_telefono') as FormControl
  }

  get cli_asesor (){
    return this.formPqrs.get('cli_asesor') as FormControl
  }

  get cli_pp_sistema (){
    return this.formPqrs.get('cli_pp_sistema') as FormControl
  }

  formPqrs = new FormGroup({
    'cli_nombre': new FormControl('', [Validators.required, Validators.maxLength(500)]),
    'cli_nit': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'cli_clasificacion': new FormControl('', Validators.required),
    'cli_ciudad': new FormControl('', Validators.required),
    'cli_zona': new FormControl('', Validators.required),
    'cli_direccion': new FormControl('', [Validators.required,Validators.maxLength(5000)]),
    'cli_telefono': new FormControl('', [Validators.required,Validators.maxLength(50)]),
    'cli_asesor': new FormControl('', Validators.required),
    'cli_pp_sistema': new FormControl('', [Validators.required, Validators.max(99999)])
  });

  public loading: boolean | any;

  carg_correo: any;
  contadorDes = 0;
  contadorObs = 0;

  dataCiudad: any;
  dataZona: any;
  dataClasificacion: any;
  data: any;

  constructor(private _clienteService: ClienteService,
    private _clienteClasificacionService: ClienteClasificacionService,
    private _clienteCiudadService: ClienteCiudadService,
    private _clienteZonaService: ClienteZonaService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getClasificacionOption();
    this.getCiudadOption();
  }

  AgregarCliente() {
    this.spinner.show()
    this.loading = true;

    const body = {
      cli_id: null,
      cli_nombre: this.cli_nombre.value,
      cli_nit: this.cli_nit.value,
      id_clasificacion: this.cli_clasificacion.value,
      cli_direccion: this.cli_direccion.value,
      cli_telefono: this.cli_telefono.value,
      cli_ciudad: this.cli_ciudad.value,
      cli_zona: this.cli_zona.value,
      cli_asesor_nombre: this.cli_asesor.value,
      cli_pp_sistema: this.cli_pp_sistema.value
    }

    this._clienteService.postCliente(body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Cliente agregado exitosamente`, `Registro Cliente`);
      this.router.navigate([`/Clientes`]);
      this.spinner.hide();
    },
    (error) => {
      this.toastr.error(`Error al registrar el cliente: ${error.message}`, `Error`)
      this.spinner.hide();
    })
  }

  onKeyDescripcion(event: any) {
    this.contadorDes = event.target.value.length
  }

  onKeyDireccion(event: any) {
    this.contadorObs = event.target.value.length
  }

  getClasificacionOption() {
    this._clienteClasificacionService.getClienteClasificacion().subscribe((data) => {
      this.dataClasificacion = data;
    })
  }

  getCiudadOption() {
    this._clienteCiudadService.getClienteCiudad().subscribe((data) => {
      this.dataCiudad = data;
    })
  }

  getZonaCiudadOption(cz_id:any) {
    this._clienteZonaService.getClienteZonaCiudad(cz_id).subscribe((data) => {
      this.dataZona = data;
    })
  }

}
