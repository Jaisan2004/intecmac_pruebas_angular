import { Component, inject } from '@angular/core';
import { FormulariosService } from '../../services/formularios/formularios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-pqrs',
  templateUrl: './agregar-pqrs.component.html',
  styleUrl: './agregar-pqrs.component.css'
})
export class AgregarPqrsComponent {

  private builder = inject(FormBuilder);
  form: FormGroup|any;

  id_cli: string = '';
  cli_zona: string = '';
  cli_asesor: string = '';
  pqrs_lote: string = '';
  id_prod: string ='';
  id_causa: string = '';
  id_cargo: string = '';
  id_tipo: string = '';

  contadorDes = 0;
  contadorAnalisis = 0

  dataClienteOpcion: any;
  dataCliente: any;
  dataProductoOption: any;
  dataPqrsCausa: any;
  dataCargos: any;
  dataPqrsTipo: any;

  constructor(private _formulariosService: FormulariosService) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      cliente: ['', [Validators.required]],
      lote: ['', Validators.required]
    });
    this.getClienteOpcion();
    this.getProductoOpcion();
    this.getPqrsCausaOption();
    this.getCargosOption();
    this.getPqrsTipoOption();
  }

  onKeyDescripcion(event: any){
    this.contadorDes = event.target.value.length
   }

   onKeyAnalisis(event: any){
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

  getPqrsCausaOption(){
    this._formulariosService.getPqrsCausaOpcion().subscribe((data)=>{
      this.dataPqrsCausa = data;
    })
  }

  getCargosOption(){
    this._formulariosService.getCargosOpcion().subscribe((data)=>{
      this.dataCargos= data;
    })
  }

  getPqrsTipoOption(){
    this._formulariosService.getPqrsTipoOpcion().subscribe((data)=>{
      this.dataPqrsTipo= data;
    })
  }

  

}
