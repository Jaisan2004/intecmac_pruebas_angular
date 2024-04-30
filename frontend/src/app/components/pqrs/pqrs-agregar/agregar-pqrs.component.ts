import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-pqrs',
  templateUrl: './agregar-pqrs.component.html',
  styleUrl: './agregar-pqrs.component.css'
})
export class AgregarPqrsComponent {

  get cliente (){
    return this.formPqrs.get('cliente') as FormControl
  }

  get producto (){
    return this.formPqrs.get('producto') as FormControl
  }

  get lote (){
    return this.formPqrs.get('lote') as FormControl
  }

  get cantidad (){
    return this.formPqrs.get('cantidad') as FormControl
  }
  
  get documento (){
    return this.formPqrs.get('documento') as FormControl
  }

  get descripcion (){
    return this.formPqrs.get('descripcion') as FormControl
  }

  get analisis (){
    return this.formPqrs.get('analisis') as FormControl
  }

  get costo (){
    return this.formPqrs.get('costo') as FormControl
  }

  get causa (){
    return this.formPqrs.get('causa') as FormControl
  }

  get cargo (){
    return this.formPqrs.get('cargo') as FormControl
  }

  get tipo (){
    return this.formPqrs.get('tipo') as FormControl
  }

  get doc_cruce (){
    return this.formPqrs.get('doc_cruce') as FormControl
  }

  formPqrs = new FormGroup({
    'cliente': new FormControl('', Validators.required),
    'producto': new FormControl('', Validators.required),
    'lote': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'cantidad': new FormControl('', [Validators.required, Validators.max(9999999)]),
    'documento': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'analisis': new FormControl('', Validators.maxLength(5000)),
    'costo': new FormControl('', Validators.max(9999999999999999999)),
    'causa': new FormControl('', Validators.required),
    'cargo': new FormControl('', Validators.required),
    'tipo': new FormControl('', Validators.required),
    'doc_cruce': new FormControl('', Validators.maxLength(200))
  });


  cli_zona: string = '';
  cli_asesor: string = '';


  contadorDes = 0;
  contadorAnalisis = 0

  dataClienteOpcion: any;
  dataCliente: any;
  dataProductoOption: any;
  dataPqrsCausa: any;
  dataCargos: any;
  dataPqrsTipo: any;

  constructor(private _formulariosService: FormulariosService, 
    private _pqrsService: PqrsService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.getClienteOpcion();
    this.getProductoOpcion();
    this.getPqrsCausaOption();
    this.getCargosOption();
    this.getPqrsTipoOption();
  }

  crearPqrs() {
    const body = {
    pqrs_id: null,
    pqrs_fecha_recepcion: new Date(),
    cli_id: this.cliente.value,
    prod_id: this.producto.value,
    pqrs_lote: this.lote.value,
    pqrs_prod_cantidad: this.cantidad.value,
    pqrs_doc: this.documento.value,
    pqrs_descripcion: this.descripcion.value,
    pqrs_analisis: this.analisis.value,
    costo: this.costo.value,
    pqrs_causa_raiz_id: this.causa.value,
    carg_id: this.cargo.value,
    pt_id: this.tipo.value,
    pqrs_fecha_respuesta: "",
    pqrs_dias_gestion: 0,
    pqrs_documento_cruce: this.doc_cruce.value,
    pqrs_estado: 1
    }
    this._pqrsService.postPqrs(body).subscribe(() => {
      this.toastr.success(`PQRS del asesor ${this.cli_asesor} se registro exitosamente`, `Registro PQRS`)
      this.router.navigate(['/PQRS'])
    },
    (error) => {
      this.toastr.error(`Error al registrar PQRS: ${error.message}`, `Error`)
    })
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
    this._formulariosService.getInfoCliente(this.cliente?.value).subscribe((data) => {
      this.dataCliente = data;
      if (this.dataCliente) {
        this.cli_zona = this.dataCliente.cli_zona;
        this.cli_asesor = this.dataCliente.cli_asesor_nombre;
      }
    })
  }

  getProductoOpcion() {
    this._formulariosService.getProductosOpcion().subscribe((data) => {
      this.dataProductoOption = data
    })
  }

  getPqrsCausaOption() {
    this._formulariosService.getPqrsCausaOpcion().subscribe((data) => {
      this.dataPqrsCausa = data;
    })
  }

  getCargosOption() {
    this._formulariosService.getCargosOpcion().subscribe((data) => {
      this.dataCargos = data;
    })
  }

  getPqrsTipoOption() {
    this._formulariosService.getPqrsTipoOpcion().subscribe((data) => {
      this.dataPqrsTipo = data;
    })
  }



}
