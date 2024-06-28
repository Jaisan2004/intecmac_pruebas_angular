import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClienteClasificacionService } from '../../../services/cliente/cliente-clasificacion.service';
import { ClienteCiudadService } from '../../../services/cliente/cliente-ciudad.service';
import { ClienteZonaService } from '../../../services/cliente/cliente-zona.service';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-cliente-modificar',
  templateUrl: './cliente-modificar.component.html',
  styleUrl: './cliente-modificar.component.css'
})
export class ClienteModificarComponent {
  get cli_id() {
    return this.formCliente.get('cli_id') as FormControl
  }

  get cli_nombre() {
    return this.formCliente.get('cli_nombre') as FormControl
  }

  get cli_nit() {
    return this.formCliente.get('cli_nit') as FormControl
  }

  get cli_clasificacion() {
    return this.formCliente.get('cli_clasificacion') as FormControl
  }

  get cli_ciudad() {
    return this.formCliente.get('cli_ciudad') as FormControl
  }

  get cli_zona() {
    return this.formCliente.get('cli_zona') as FormControl
  }

  get cli_direccion() {
    return this.formCliente.get('cli_direccion') as FormControl
  }

  get cli_telefono() {
    return this.formCliente.get('cli_telefono') as FormControl
  }

  get cli_asesor() {
    return this.formCliente.get('cli_asesor') as FormControl
  }

  get cli_pp_sistema() {
    return this.formCliente.get('cli_pp_sistema') as FormControl
  }

  formCliente = new FormGroup({
    'cli_id': new FormControl({ value: '', disabled: true }),
    'cli_nombre': new FormControl('', [Validators.required, Validators.maxLength(500)]),
    'cli_nit': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'cli_clasificacion': new FormControl('', Validators.required),
    'cli_ciudad': new FormControl('', Validators.required),
    'cli_zona': new FormControl('', Validators.required),
    'cli_direccion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'cli_telefono': new FormControl('', [Validators.required, Validators.maxLength(50)]),
    'cli_asesor': new FormControl('', Validators.required),
    'cli_pp_sistema': new FormControl('', [Validators.required, Validators.max(99999)])
  });

  public loading: boolean | any;
  public clienteModificar: boolean=false;
  public clienteVer: boolean=false;
  public labelCliente: boolean=false;

  carg_correo: any;
  contadorDirecc = 0;
  title: string = '';

  dataCliente: any;
  dataCiudad: any;
  dataZona: any;
  dataClasificacion: any;
  data: any;

  constructor(private _clienteService: ClienteService,
    private _clienteClasificacionService: ClienteClasificacionService,
    private _clienteCiudadService: ClienteCiudadService,
    private _clienteZonaService: ClienteZonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cli_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getCliente();
    this.getClasificacionOption();
    this.getCiudadOption();
    this.modificarOrVerCliente();
  }

  modificarOrVerCliente() {
    const ruta = this.activatedRoute.snapshot.url[0].path;
    if(ruta=='VerClientes'){
      this.clienteModificar = false;
      this.title = 'Ver';
      this.clienteVer = true;
      this.labelCliente = true;
      this.formCliente = new FormGroup({
        'cli_id': new FormControl({ value: '', disabled: true }),
        'cli_nombre': new FormControl({ value: '', disabled: true }),
        'cli_nit': new FormControl({ value: '', disabled: true }),
        'cli_clasificacion': new FormControl({ value: '', disabled: true }),
        'cli_ciudad': new FormControl({ value: '', disabled: true }),
        'cli_zona': new FormControl({ value: '', disabled: true }),
        'cli_direccion': new FormControl({ value: '', disabled: true }),
        'cli_telefono': new FormControl({ value: '', disabled: true }),
        'cli_asesor': new FormControl({ value: '', disabled: true }),
        'cli_pp_sistema': new FormControl({ value: '', disabled: true })
      });
    }else{
      this.title = 'Modificar';
      this.clienteModificar = true;
      this.clienteVer = false;
      this.labelCliente = false;
    }
  }

  ModificarCliente() {
    this.spinner.show()
    this.loading = true;

    const body = {
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

    this._clienteService.updateCliente(this.cli_id.value,body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Cliente Modificado exitosamente`, `Modifico Cliente`);
      this.router.navigate([`/Clientes`]);
      this.spinner.hide();
    },
      (error) => {
        this.toastr.error(`Error al Modificar el cliente: ${error.message}`, `Error`)
        this.spinner.hide();
      })
  }

  onKeyDireccion(event: any) {
    this.contadorDirecc = event.target.value.length
  }

  getCliente(){
    this.spinner.show()
    this._clienteService.getCliente(this.cli_id.value).subscribe((data)=>{
      this.dataCliente = data;
      this.cli_nombre.setValue(this.dataCliente.cli_nombre);
      this.cli_nit.setValue(this.dataCliente.cli_nit);
      this.cli_clasificacion.setValue(this.dataCliente.id_clasificacion);
      this.cli_direccion.setValue(this.dataCliente.cli_direccion);
      this.cli_telefono.setValue(this.dataCliente.cli_telefono);
      this.cli_ciudad.setValue(this.dataCliente.cli_ciudad);
      this.getZonaCiudadOption(this.dataCliente.cli_ciudad);
      this.cli_zona.setValue(this.dataCliente.cli_zona);
      this.cli_asesor.setValue(this.dataCliente.cli_asesor_nombre);
      this.cli_pp_sistema.setValue(this.dataCliente.cli_pp_sistema);
      this.contadorDirecc = this.cli_direccion.value?.length||0;
      this.spinner.hide();
    })
  }

  getClasificacionOption() {
    this._clienteClasificacionService.getClienteClasificacion().subscribe((data) => {
      this.dataClasificacion = data;
    })
  }

  getCiudadOption() {
    this._clienteCiudadService.getClienteCiudades().subscribe((data) => {
      this.dataCiudad = data;
    })
  }

  getZonaCiudadOption(c_c_id: any) {
    this._clienteZonaService.getClienteZonasByCiudad(c_c_id).subscribe((data) => {
      this.dataZona = data;
    })
  }
}
