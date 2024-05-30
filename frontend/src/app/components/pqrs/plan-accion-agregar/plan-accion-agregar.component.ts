import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanAccionService } from '../../../services/pqrs/plan-accion/plan-accion.service';
import { CargosService } from '../../../services/cargos/cargos.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-plan-accion-agregar',
  templateUrl: './plan-accion-agregar.component.html',
  styleUrl: './plan-accion-agregar.component.css'
})
export class PlanAccionAgregarComponent {

  get id_ppa (){
    return this.formPqrs.get('id_ppa') as FormControl
  }
  
  get ppa_fecha_inicio (){
    return this.formPqrs.get('ppa_fecha_inicio') as FormControl
  }

  get ppa_descripcion (){
    return this.formPqrs.get('ppa_descripcion') as FormControl
  }

  get ppa_fecha_cumplimiento (){
    return this.formPqrs.get('ppa_fecha_cumplimiento') as FormControl
  }

  get carg_id (){
    return this.formPqrs.get('carg_id') as FormControl
  }

  get ppa_observaciones (){
    return this.formPqrs.get('ppa_observaciones') as FormControl
  }

  get pqrs_id (){
    return this.formPqrs.get('pqrs_id') as FormControl
  }


  formPqrs = new FormGroup({
    'id_ppa': new FormControl({value:'', disabled: true}),
    'ppa_fecha_inicio': new FormControl({value:'', disabled: true}),
    'ppa_descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'ppa_fecha_cumplimiento': new FormControl(''),
    'carg_id': new FormControl('', Validators.required),
    'ppa_observaciones': new FormControl('', Validators.maxLength(5000)),
    'pqrs_id': new FormControl('', Validators.required)
  });

  public loading: boolean | any;

  carg_correo: any;
  contadorDes = 0;
  contadorObs = 0;

  dataCargo: any;
  dataCargos: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _PlanAccionPqrs: PlanAccionService,
    private _CargoService: CargosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.pqrs_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getCargosOption();
  }

  AgregarPlanPqrs() {
    this.spinner.show()
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
      ppa_id: null,
      ppa_fecha_inicio: new Date(),
      ppa_descripcion: this.ppa_descripcion.value,
      ppa_fecha_cumplimiento: this.ppa_fecha_cumplimiento.value,
      carg_id: this.carg_id.value,
      ppa_observaciones: this.ppa_observaciones.value,
      pqrs_id: this.pqrs_id.value,
      ppa_estado: 'PENDIENTE'
    }

    const bodyCorreo={
      saludos: saludo,
      cargo:this.dataCargo.carg_nombre,
      ppa_fecha_inicio: dateString,
      ppa_descripcion: this.ppa_descripcion.value,
      ppa_observaciones: this.ppa_observaciones.value,
      ppa_fecha_cumplimiento: this.ppa_fecha_cumplimiento.value,
      carg_correo: this.carg_correo,
      pqrs_id: this.pqrs_id.value,
    }

    this._PlanAccionPqrs.postPlanPqrs(body).subscribe(() => {
      this.loading = false;
      this._PlanAccionPqrs.postCorreoPlanPqrs(bodyCorreo).subscribe(()=>{
        this.toastr.success(`Correo Enviado a ${this.dataCargo.carg_nombre}`, `Notificación de Plan de Acción`)
      },
      (error) => {
        this.toastr.error(`Error al enviar correo a ${this.dataCargo.carg_nombre}: ${error.message}`, `Error`)
        this.spinner.hide();
      });
      this.toastr.success(`Plan de acción agregado exitosamente`, `Registro Plan de Acción`)
      this.router.navigate([`/PlanAccionPqrs/${this.pqrs_id.value}`])
      this.spinner.hide();
    },
    (error) => {
      this.toastr.error(`Error al registrar Plan de acción: ${error.message}`, `Error`)
      this.spinner.hide();
    })
  }

  onKeyDescripcion(event: any) {
    this.contadorDes = event.target.value.length
  }

  onKeyObservaciones(event: any) {
    this.contadorObs = event.target.value.length
  }

  getCargosOption() {
    this._formulariosService.getCargosOpcion().subscribe((data) => {
      this.dataCargos = data;
    })
  }

  getCargo(id:any){
    this._CargoService.getCargo(id).subscribe((data)=>{
      this.dataCargo = data;
      this.carg_correo = this.dataCargo.carg_correo
      console.log(this.carg_correo)
    })
  }

}
