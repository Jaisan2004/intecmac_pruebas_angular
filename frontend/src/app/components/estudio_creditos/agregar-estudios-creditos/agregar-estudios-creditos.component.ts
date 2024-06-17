import { Component, ViewChild } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error/error.service';
import { TipoEstudioCreditosService } from '../../../services/estudio-creditos/tipo-estudio-creditos.service';
import { EstudioCreditosService } from '../../../services/estudio-creditos/estudio-creditos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentoEstudioCreditosService } from '../../../services/estudio-creditos/documento-estudio-creditos.service';
import { DocumentoCreditosService } from '../../../services/estudio-creditos/documento-creditos.service';

@Component({
  selector: 'app-agregar-estudios-creditos',
  templateUrl: './agregar-estudios-creditos.component.html',
  styleUrl: './agregar-estudios-creditos.component.css'
})
export class AgregarEstudiosCreditosComponent {

  columns: any[] = [
    { name: 'Nombre del Documento', titulo: 'Nombre del Documento', prop: 'cred_doc_nombre' }
  ];

  displayedColumns: string[] = [
    'Ver',
    'Nombre del Documento',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get cred_estu_id() {
    return this.formEstudio.get('cred_estu_id') as FormControl
  }

  get cliente() {
    return this.formEstudio.get('cliente') as FormControl
  }

  get tipo() {
    return this.formEstudio.get('tipo') as FormControl
  }

  get obserComercial() {
    return this.formEstudio.get('obserComercial') as FormControl
  }
  
  get cliente_desde() {
    return this.formEstudio.get('cliente_desde') as FormControl
  }

  get cupo_actual(){
    return this.formEstudio.get('cupo_actual') as FormControl
  }

  get descuento(){
    return this.formEstudio.get('descuento') as FormControl
  }

  formEstudio = new FormGroup({
    'cred_estu_id': new FormControl({value: '', disabled:true}),
    'cliente': new FormControl('', Validators.required),
    'tipo': new FormControl('', Validators.required),
    'obserComercial': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'cliente_desde': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'cupo_actual': new FormControl('', [Validators.required, Validators.max(999999999)]),
    'descuento': new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  get documento(){
    return this.formDocumento.get('documento') as FormControl
  }

  formDocumento = new FormGroup({
    'documento': new FormControl('', Validators.required)
  })


  cli_plazo: string = '';
  cli_asesor: string = '';
  cli_nombre: string = '';

  public loading: boolean | any;
  public documentoNuevo: boolean = false;
  public documentoModificar: boolean = false;
  contadorDes = 0;
  contadorAnalisis = 0

  dataTipoEstudioOpcion: any;
  dataClienteOpcion: any;
  dataCliente: any;
  dataDocumentoOption:any;
  dataDocumento:any;
  doc_nombre:any;
  data: any;
  pqrs_id: any;
  fileTmp:any;

  title: string= '';
  botonFinal: string='';
  
  public documentos: boolean = false;

  constructor(private _formulariosService: FormulariosService,
    private _credEstudioTipo: TipoEstudioCreditosService,
    private _credEstudio: EstudioCreditosService,
    private _documentoEstuCred: DocumentoEstudioCreditosService,
    private _documentoCred: DocumentoCreditosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cred_estu_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));

    this.crearOrModificarEstudio(this.cred_estu_id.value);
  }

  crearOrModificarEstudio(cred_estu_id:any){
    if(cred_estu_id==null){
      this.title = 'Agregar';
      this.botonFinal = 'Registrar y Continuar';
      this.documentos = false;
      this.getClienteOpcion();
      this.getTipoEstudioOpcion();
    }else{
      this.title = 'Modificar';
      this.botonFinal = 'Actualizar';
      this.documentos = true;
      this.getClienteOpcion();
      this.getTipoEstudioOpcion();
      this.getDocumentosOpcion();
      this.getCredEstudio();
      this.getListDocumentos();
    }
  }

  crearPqrs() {

  }

  getCredEstudio(){
    this.spinner.show();
    this._credEstudio.getCredEstudio(this.cred_estu_id.value).subscribe((data:any)=>{
      this.data = data;
      this.cliente.setValue(this.data.cli_id);
      this.tipo.setValue(this.data.cred_tipo_id);
      this.obserComercial.setValue(this.data.cred_obser_comercial);
      this.cliente_desde.setValue(this.data.cred_cliente_desde);
      this.cupo_actual.setValue(this.data.cred_cupo_actual);
      this.descuento.setValue(this.data.cred_descuento_otorgado);
      this.getInfoCliente();
    })
  }

  onKeyobserComercial(event: any) {
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

  getTipoEstudioOpcion(){
    this.spinner.show();

    this._credEstudioTipo.getCredTipos().subscribe((data)=>{
      this.dataTipoEstudioOpcion = data;
      this.spinner.hide()
    })
  }

  getDocumentosOpcion(){
    this.spinner.show();

    this._documentoCred.getCredDocumentos().subscribe((data:any)=>{
      this.dataDocumentoOption = data;
      this.spinner.hide();
    })
  }

  getInfoCliente() {
    this._formulariosService.getInfoCliente(this.cliente.value).subscribe((data) => {
      this.dataCliente = data;
      if (this.dataCliente) {
        this.cli_plazo = this.dataCliente[0].cli_pp_sistema+' días';
        this.cli_asesor = this.dataCliente[0].cli_asesor_nombre;
        this.cli_nombre = this.dataCliente[0].cli_nombre;
      }
    })
  }

  getListDocumentos(){
    this.spinner.show();
    this._documentoEstuCred.getCredDocsEstu(this.cred_estu_id.value).subscribe((data:any)=>{
      this.dataSource.data = data;
      this.spinner.hide();
    })
  }

  agregarDocumentoBoton(){
    this.documentoNuevo = true;
    this.documentoModificar = false;
  }

  cancelarDocumentoBoton(){
    this.documentoNuevo = false;
    this.documentoModificar = false;
    this.documento.setValue('');
  }

  getDocumentoNombre(id:any){
    this.spinner.show();

    this._documentoCred.getCredDocumento(id).subscribe((data:any)=>{
      this.dataDocumento = data;
      this.doc_nombre = this.dataDocumento.cred_doc_nombre;
      this.spinner.hide();
    })
  }

  getFile(event:any){
    const [ file ] = event.target.files;

    const ext = file.name.split('.').pop();
    this.fileTmp = {
      fileRaw: file,
      fileName: `${this.doc_nombre}${this.cred_estu_id.value}.${ext}`
    }
  }

  sendFile(){
    this.spinner.show();
    const body = new FormData();

    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName);

    this._credEstudio.archivoGuardar(body).subscribe(res=>{
      // this.agregarDocumento(res.url);
      console.log(res)
      console.log(res.url);
      this.toastr.success(`El archivo de credito "${this.fileTmp.fileName}" se guardo exitosamente`,'Archivo guardado');
      this.spinner.hide();
    });
  }

  agregarDocumento(url: any) {
    this.spinner.show();

    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_doc_id: this.documento.value,
      cred_doc_url: url
    }
    this._documentoEstuCred.postCredDocEstu(body).subscribe(() => {
      this.toastr.success(`Documento Agregado al estudio de credito`, `Documento Agregado`);
      this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}`]);
      this.cancelarDocumentoBoton()
      this.spinner.hide();
    });
  }
}
