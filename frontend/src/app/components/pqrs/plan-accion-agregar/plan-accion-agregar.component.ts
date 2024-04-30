import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plan-accion-agregar',
  templateUrl: './plan-accion-agregar.component.html',
  styleUrl: './plan-accion-agregar.component.css'
})
export class PlanAccionAgregarComponent {

  get id_pqrs (){
    return this.formPqrs.get('id_pqrs') as FormControl
  }
  
  get ppa_fecha_inicio (){
    return this.formPqrs.get('ppa_fecha_inicio') as FormControl
  }

  get ppa_descripcion (){
    return this.formPqrs.get('ppa_descripcion') as FormControl
  }

  get carg_id (){
    return this.formPqrs.get('carg_id') as FormControl
  }


  formPqrs = new FormGroup({
    'id_pqrs': new FormControl({value:'', disabled: true}),
    'ppa_fecha_inicio': new FormControl({value:'', disabled: true}),
    'ppa_descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'carg_id': new FormControl('', Validators.required),
  });


  cli_zona: string = '';
  cli_asesor: string = '';


  contadorDes = 0;

  dataCargos: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _pqrsService: PqrsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id_pqrs.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getCargosOption();
  }

  modificarPqrs() {
    const body = {
      // pqrs_fecha_recepcion: this.fecha_recepcion.value,
      // cli_id: this.cliente.value,
      // prod_id: this.producto.value,
      // pqrs_lote: this.lote.value,
      // pqrs_prod_cantidad: this.cantidad.value,
      // pqrs_doc: this.documento.value,
      // pqrs_descripcion: this.descripcion.value,
      // pqrs_analisis: this.analisis.value,
      // costo: this.costo.value,
      // pqrs_causa_raiz_id: this.causa.value,
      // carg_id: this.cargo.value,
      // pt_id: this.tipo.value,
      // pqrs_fecha_respuesta: "",
      // pqrs_dias_gestion: 0,
      // pqrs_documento_cruce: this.doc_cruce.value,
      // pqrs_estado: this.estado.value
    }
    this._pqrsService.updatePqrs(this.id_pqrs.value, body).subscribe(() => {

      this.toastr.success(`PQRS del asesor ${this.cli_asesor} se modifico exitosamente`, `Modificacion PQRS`)
      this.router.navigate(['/PQRS'])

    })
  }


  onKeyDescripcion(event: any) {
    this.contadorDes = event.target.value.length
  }

  getCargosOption() {
    this._formulariosService.getCargosOpcion().subscribe((data) => {
      this.dataCargos = data;
    })
  }

}
