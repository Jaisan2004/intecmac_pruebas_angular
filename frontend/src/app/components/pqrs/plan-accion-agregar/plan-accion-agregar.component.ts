import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanAccionService } from '../../../services/pqrs/plan-accion/plan-accion.service';

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

  get carg_id (){
    return this.formPqrs.get('carg_id') as FormControl
  }

  get pqrs_id (){
    return this.formPqrs.get('pqrs_id') as FormControl
  }


  formPqrs = new FormGroup({
    'id_ppa': new FormControl({value:'', disabled: true}),
    'ppa_fecha_inicio': new FormControl({value:'', disabled: true}),
    'ppa_descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'carg_id': new FormControl('', Validators.required),
    'pqrs_id': new FormControl('', Validators.required)
  });


  contadorDes = 0;

  dataCargos: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _PlanAccionPqrs: PlanAccionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pqrs_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getCargosOption();
  }

  AgregarPlanPqrs() {
    const body = {
      ppa_id: null,
      ppa_fecha_inicio: new Date(),
      ppa_descripcion: this.ppa_descripcion.value,
      ppa_fecha_cumplimiento: '',
      carg_id: this.carg_id.value,
      pqrs_id: this.pqrs_id.value
    }
    this._PlanAccionPqrs.postPlanPqrs(body).subscribe(() => {

      this.toastr.success(`Plan de acción agregado exitosamente`, `Registro Plan de Acción`)
      this.router.navigate([`/planAccionPqrs/${this.pqrs_id.value}`])

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
