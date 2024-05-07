import { Component } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanAccionService } from '../../../services/pqrs/plan-accion/plan-accion.service';


@Component({
  selector: 'app-plan-accion-modificar',
  templateUrl: './plan-accion-modificar.component.html',
  styleUrl: './plan-accion-modificar.component.css'
})
export class PlanAccionModificarComponent {
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

  get pqrs_id (){
    return this.formPqrs.get('pqrs_id') as FormControl
  }

  get ppa_estado (){
    return this.formPqrs.get('ppa_estado') as FormControl
  }


  formPqrs = new FormGroup({
    'id_ppa': new FormControl({value:'', disabled: true}),
    'ppa_fecha_inicio': new FormControl({value:'', disabled: true}),
    'ppa_descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'ppa_fecha_cumplimiento': new FormControl(''),
    'carg_id': new FormControl('', Validators.required),
    'pqrs_id': new FormControl('', Validators.required),
    'ppa_estado': new FormControl('', Validators.required)

  });

  public loading: boolean | any;

  contadorDes = 0;

  dataCargos: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _PlanAccionPqrs: PlanAccionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id_ppa.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getPlanPqrs();
    this.getCargosOption();
  }

  modificarPlanPqrs() {
    this.loading = true;
    const body = {
      ppa_fecha_inicio: this.ppa_fecha_inicio.value,
      ppa_descripcion: this.ppa_descripcion.value,
      ppa_fecha_cumplimiento: this.ppa_fecha_cumplimiento.value,
      carg_id: this.carg_id.value,
      pqrs_id: this.pqrs_id.value,
      ppa_estado: this.ppa_estado.value
    }
    this._PlanAccionPqrs.putPlanPqrs(this.id_ppa.value,body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Plan de acción modificado exitosamente`, `Registro Plan de Acción`)
      this.router.navigate([`/planAccionPqrs/${this.pqrs_id.value}`])

    })
  }

  getPlanPqrs(){
    this._PlanAccionPqrs.getPqrsPlan(this.id_ppa.value).subscribe((data)=>{
      this.data = data;
      this.ppa_fecha_inicio.setValue(this.data.ppa_fecha_inicio)
      this.ppa_descripcion.setValue(this.data.ppa_descripcion);
      this.ppa_fecha_cumplimiento.setValue(this.data.ppa_fecha_cumplimiento);
      this.carg_id.setValue(this.data.carg_id);
      this.pqrs_id.setValue(this.data.pqrs_id);
      this.ppa_estado.setValue(this.data.ppa_estado);
    })
  }


  onKeyDescripcion(event: any) {
    this.contadorDes = event.target.value.length
  }

  getCargosOption() {
    this._formulariosService.getCargosOpcion().subscribe((data: any) => {
      this.dataCargos = data;
    })
  }
}