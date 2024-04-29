import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-pqrs',
  templateUrl: './modificar-pqrs.component.html',
  styleUrl: './modificar-pqrs.component.css'
})
export class ModificarPqrsComponent {
  pqrs_id: any;
  cli_id: string = '';
  pqrs_fecha_recepcion: string='';
  cli_zona: string = '';
  cli_asesor: string = '';
  pqrs_lote: string = '';
  pqrs_prod_cantidad: string = '';
  pqrs_doc: string = '';
  pqrs_descripcion: string = '';
  pqrs_analisis: string = '';
  costo: string = '';
  prod_id: string = '';
  pqrs_causa_raiz_id: string = '';
  carg_id: string = '';
  pt_id: string = '';
  pqrs_documento_cruce: string = '';
  pqrs_estado: string='';


  contadorDes = 0;
  contadorAnalisis = 0

  dataClienteOpcion: any;
  dataCliente: any;
  dataProductoOption: any;
  dataPqrsCausa: any;
  dataCargos: any;
  dataPqrsTipo: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _pqrsService: PqrsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pqrs_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPqrs();
    this.getClienteOpcion();
    this.getProductoOpcion();
    this.getPqrsCausaOption();
    this.getCargosOption();
    this.getPqrsTipoOption();
  }

  modificarPqrs() {
    const body = {
      pqrs_id: this.pqrs_id,
      pqrs_fecha_recepcion: this.pqrs_fecha_recepcion,
      cli_id: this.cli_id,
      prod_id: this.prod_id,
      pqrs_lote: this.pqrs_lote,
      pqrs_prod_cantidad: this.pqrs_prod_cantidad,
      pqrs_doc: this.pqrs_doc,
      pqrs_descripcion: this.pqrs_descripcion,
      pqrs_analisis: this.pqrs_analisis,
      costo: this.costo,
      pqrs_causa_raiz_id: this.pqrs_causa_raiz_id,
      carg_id: this.carg_id,
      pt_id: this.pt_id,
      pqrs_fecha_respuesta: "",
      pqrs_dias_gestion: 0,
      pqrs_documento_cruce: this.pqrs_documento_cruce,
      pqrs_estado: this.pqrs_estado
    }
    this._pqrsService.updatePqrs(body, this.pqrs_id).subscribe(() => {

      this.toastr.success(`PQRS del asesor ${this.cli_asesor} se modifico exitosamente`, `Modificacion PQRS`)
      this.router.navigate(['/PQRS'])

    })
  }

  getPqrs(){
    this._pqrsService.getPqrs(this.pqrs_id).subscribe((data) =>{
      this.data = data;
      this.pqrs_fecha_recepcion = this.data.pqrs_fecha_recepcion,
      this.cli_id = this.data.cli_id,
      this.prod_id = this.data.prod_id,
      this.pqrs_lote = this.data.pqrs_lote,
      this.pqrs_prod_cantidad = this.data.pqrs_prod_cantidad,
      this.pqrs_doc = this.data.pqrs_doc,
      this.pqrs_descripcion = this.data.pqrs_descripcion,
      this.pqrs_analisis = this.data.pqrs_analisis,
      this.costo = this.data.costo,
      this.pqrs_causa_raiz_id = this.data.pqrs_causa_raiz_id,
      this.carg_id = this.data.carg_id,
      this.pt_id = this.data.pt_id,
      this.pqrs_documento_cruce = this.data.pqrs_documento_cruce,
      this.pqrs_estado = this.data.pqrs_estado

      this.getInfoCliente(this.cli_id);
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

  getInfoCliente(cli_id: any) {
    this._formulariosService.getInfoCliente(cli_id).subscribe((data) => {
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
