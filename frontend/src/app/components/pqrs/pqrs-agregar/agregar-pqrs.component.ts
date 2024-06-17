import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error/error.service';


@Component({
  selector: 'app-agregar-pqrs',
  templateUrl: './agregar-pqrs.component.html',
  styleUrl: './agregar-pqrs.component.css'
})
export class AgregarPqrsComponent {

  get cliente() {
    return this.formPqrs.get('cliente') as FormControl
  }
  get documento() {
    return this.formPqrs.get('documento') as FormControl
  }

  get descripcion() {
    return this.formPqrs.get('descripcion') as FormControl
  }


  formPqrs = new FormGroup({
    'cliente': new FormControl('', Validators.required),
    'documento': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
  });


  cli_zona: string = '';
  cli_asesor: string = '';
  cli_nombre: string = '';

  public loading: boolean | any;
  contadorDes = 0;
  contadorAnalisis = 0

  dataClienteOpcion: any;
  dataCliente: any;
  data: any;
  pqrs_id: any;

  constructor(private _formulariosService: FormulariosService,
    private _pqrsService: PqrsService,
    private _errorService: ErrorService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.getClienteOpcion();
  }

  crearPqrs() {
    this.spinner.show();
    this.loading = true;

    const fecha = new Date();
    const isoString = fecha.toISOString();
    const dateString = isoString.slice(0, 10);

    const hora = fecha.getHours();
    let saludo = '';

    if (hora < 12) {
      saludo = 'Buenos días';
    } else if (hora < 18) {
      saludo = 'Buenas tardes';
    } else {
      saludo = 'Buenas noches';
    }

    const body = {
      pqrs_id: null,
      pqrs_fecha_recepcion: new Date(),
      cli_id: this.cliente.value,
      pqrs_doc: this.documento.value,
      pqrs_evidencia: "",
      pqrs_descripcion: this.descripcion.value,
      pqrs_fecha_respuesta: "",
      pqrs_estado: 1
    }



    this._pqrsService.postPqrs(body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`PQRS del asesor ${this.cli_asesor} se registro exitosamente`, `Registro PQRS`)
      this._pqrsService.getLastPqrs().subscribe((data: any) => {
        this.data = data;
        this.pqrs_id = this.data[0].pqrs_id;
        const bodyCorreo={
          saludos: saludo,
          pqrs_id: this.pqrs_id,
          pqrs_fecha_recepcion: dateString,
          cli_nombre: this.cli_nombre,
          cli_zona: this.cli_zona,
          cli_asesor: this.cli_asesor,
          pqrs_doc: this.documento.value,
          pqrs_descripcion: this.descripcion.value
        }
        this._pqrsService.postCorreoCreacionPqrs(bodyCorreo).subscribe(()=>{
          this.toastr.success(`Registro de la PQRS Notificado`, `Notificación de Nueva PQRS`);
        },
        (error: HttpErrorResponse) => {
          this._errorService.msjError(error);
        });
        this.spinner.hide();
        this.router.navigate([`ModificarPqrs/${this.pqrs_id}`]);
      })
    },
      (error) => {
        this.toastr.error(`Error al registrar PQRS: ${error.message}`, `Error`)
        this.spinner.hide();
      });

  }

  onKeyDescripcion(event: any) {
    this.contadorDes = event.target.value.length
  }

  onKeyAnalisis(event: any) {
    this.contadorAnalisis = event.target.value.length
  }

  getClienteOpcion() {
    this._formulariosService.getClienteOpcion().subscribe((data) => {
      this.dataClienteOpcion = data

    })
  }

  getInfoCliente() {
    this._formulariosService.getInfoCliente(this.cliente.value).subscribe((data) => {
      this.dataCliente = data;
      if (this.dataCliente) {
        this.cli_zona = this.dataCliente[0].zona;
        this.cli_asesor = this.dataCliente[0].cli_asesor_nombre;
        this.cli_nombre = this.dataCliente[0].cli_nombre;
      }
    })
  }



}
