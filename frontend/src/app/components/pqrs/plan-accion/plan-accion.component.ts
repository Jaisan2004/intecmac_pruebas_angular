import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { PlanAccionService } from '../../../services/pqrs/plan-accion/plan-accion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-accion',
  templateUrl: './plan-accion.component.html',
  styleUrl: './plan-accion.component.css'
})
export class PlanAccionComponent {
  
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  @ViewChild('estadoPqrs', { static: true }) estadoPqrs!: TemplateRef<any>;
  @ViewChild('buttonAccion', { static: true }) buttonAccion!: TemplateRef<any>;

  rows:any;

  temp:any;

  columns:any;


  pqrs_id: any;

  ColumnMode = ColumnMode;



  constructor(private _planAccion: PlanAccionService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.pqrs_id= this.activatedRoute.snapshot.paramMap.get('id');

    this.columns = [{ name: '#', prop: 'ppa_id' }, { name: 'Fecha Inicio', prop: 'ppa_fecha_inicio' }, { name: 'Descripcion Plan', prop: 'ppa_descripcion' },
    { name: 'Fecha del Cumplimiento', prop: 'ppa_fecha_cumplimiento' },{ name: 'Persona a cargo', prop: 'carg_nombre' },{ name: 'Descripción PQRS',prop: 'pqrs_descripcion' },
    { name: 'Acciones', prop: 'acciones',cellTemplate: this.buttonAccion }];
      this.getListPqrsPlan();
    
  }


    getListPqrsPlan(){
      setTimeout(() => {
        this._planAccion.getListPqrsPlan(this.pqrs_id).subscribe((data: any)=>{
          this.rows = data
          this.temp = [...data];
        });
      }, 500);
    }

    updateFilter(event: any) {
      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.temp.filter(function (d: any) {
        return d.carg_nombre.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }  

}
