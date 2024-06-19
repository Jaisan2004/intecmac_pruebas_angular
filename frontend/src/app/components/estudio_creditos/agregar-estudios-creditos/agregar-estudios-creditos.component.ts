import { Component, ViewChild } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../aplicacion/confirm-dialog/confirm-dialog.component';
import { EstadoEstudioCreditoService } from '../../../services/estudio-creditos/estado-estudio-credito.service';

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

  get cupo_actual() {
    return this.formEstudio.get('cupo_actual') as FormControl
  }

  get descuento() {
    return this.formEstudio.get('descuento') as FormControl
  }

  get cred_esta_id() {
    return this.formEstudio.get('cred_esta_id') as FormControl
  }

  get estado_comercial() {
    return this.formEstudio.get('estado_comercial') as FormControl
  }

  formEstudio = new FormGroup({
    'cred_estu_id': new FormControl({ value: '', disabled: true }),
    'cliente': new FormControl('', Validators.required),
    'tipo': new FormControl('', Validators.required),
    'obserComercial': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'cliente_desde': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'cupo_actual': new FormControl('', [Validators.required, Validators.max(999999999)]),
    'descuento': new FormControl('', [Validators.required, Validators.maxLength(500)]),
    'cred_esta_id': new FormControl({ value: '', disabled: true }),
    'estado_comercial': new FormControl('')
  });

  get cred_estu_doc_id() {
    return this.formDocumento.get('cred_estu_doc_id') as FormControl
  }

  get documento() {
    return this.formDocumento.get('documento') as FormControl
  }

  formDocumento = new FormGroup({
    'cred_estu_doc_id': new FormControl({ value: '', disabled: true }),
    'documento': new FormControl('', Validators.required)
  })


  cli_plazo: string = '';
  cli_asesor: string = '';
  cli_nombre: string = '';

  public loading: boolean | any;
  public documentoNuevo: boolean = false;
  public documentoModificar: boolean = false;
  public botonDocumento: boolean = true;
  contadorDes = 0;
  contadorAnalisis = 0

  dataTipoEstudioOpcion: any;
  dataClienteOpcion: any;
  dataCliente: any;
  dataDocumentoOption: any;
  dataDocumento: any;
  dataDocumentoEstu: any;
  doc_nombre: any;
  data: any;
  pqrs_id: any;
  fileTmp: any;

  title: string = '';
  botonFinal: string = '';
  funcionFinal: any;

  public documentos: boolean = false;
  public todosDocumentos: boolean = false;
  public agregar: boolean = false;
  public modificar: boolean = false;

  constructor(private _formulariosService: FormulariosService,
    private _credEstudioTipo: TipoEstudioCreditosService,
    private _credEstudio: EstudioCreditosService,
    private _documentoEstuCred: DocumentoEstudioCreditosService,
    private _documentoCred: DocumentoCreditosService,
    private _estadoEstudioCred: EstadoEstudioCreditoService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    this.cred_estu_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cred_esta_id.setValue(this.activatedRoute.snapshot.paramMap.get('estado'));
    this.dataSource.sort = this.sort;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.cred_estu_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cred_esta_id.setValue(this.activatedRoute.snapshot.paramMap.get('estado'));

    this.crearOrModificarEstudio(this.cred_estu_id.value, this.cred_esta_id.value);
  }

  crearOrModificarEstudio(cred_estu_id: any, cred_esta_id: any) {
    if (cred_estu_id == null) {
      this.title = 'Agregar';
      this.botonFinal = 'Registrar y Continuar';
      this.documentos = false;
      this.agregar = true;
      this.getClienteOpcion();
      this.getTipoEstudioOpcion();
    } else {
      this.title = 'Modificar';
      this.botonFinal = 'Actualizar';
      this.documentos = true;
      this.modificar = true;
      this.getClienteOpcion();
      this.getTipoEstudioOpcion();
      this.getDocumentosOpcion();
      this.getCredEstudio();
      this.getListDocumentos();
      if(cred_esta_id > 1){
        this.botonDocumento = false;
        this.formEstudio = new FormGroup({
          'cred_estu_id': new FormControl({ value: '', disabled: true }),
          'cliente': new FormControl({ value: '', disabled: true }),
          'tipo': new FormControl({ value: '', disabled: true }),
          'obserComercial': new FormControl({ value: '', disabled: true }),
          'cliente_desde': new FormControl({ value: '', disabled: true }),
          'cupo_actual': new FormControl({ value: '', disabled: true }),
          'descuento': new FormControl({ value: '', disabled: true }),
          'cred_esta_id': new FormControl({ value: '', disabled: true }),
          'estado_comercial': new FormControl('')
        });
      }
    }
  }

  //Datos del estudio de credito Comercial
  crearCredEstudio() {
    this.spinner.show();

    const body = {
      cred_fecha_creacion: new Date(),
      cli_id: this.cliente.value,
      cred_tipo_id: this.tipo.value,
      cred_obser_comercial: this.obserComercial.value,
      cred_cliente_desde: this.cliente_desde.value,
      cred_cupo_actual: this.cupo_actual.value,
      cred_descuento_otorgado: this.descuento.value
    }

    this._credEstudio.postCredEstudio(body).subscribe((data: any) => {
      const mensaje = data.msg;
      this.toastr.success(mensaje, 'Registro Estudio de Credito');
      this._credEstudio.getLastCredEstudio().subscribe((data: any) => {
        const [dataEstu] = data;
        this.cred_estu_id.setValue(dataEstu.cred_estu_id);

        const body_estado = {
          cred_estu_id: this.cred_estu_id.value,
          cred_esta_id: 1,
          cred_esta_estu_fecha: new Date()
        }
        this.crearEstadoCred(body_estado);
        this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}`]);
      });

      this.spinner.hide();
    });

  }

  modificarCredEstudio() {
    this.spinner.show();

    const body = {
      cli_id: this.cliente.value,
      cred_tipo_id: this.tipo.value,
      cred_obser_comercial: this.obserComercial.value,
      cred_cliente_desde: this.cliente_desde.value,
      cred_cupo_actual: this.cupo_actual.value,
      cred_descuento_otorgado: this.descuento.value
    }
    this._credEstudio.updateCredEstudio(this.cred_estu_id.value, body).subscribe((data: any) => {
      const mensaje = data.msg;

      this.toastr.success(mensaje, 'Actualizar Estudio Credito');
      this.router.navigate(['/EstudioCreditos']);
      this.spinner.hide();
    });
  }

  getCredEstudio() {
    this.spinner.show();
    this._credEstudio.getCredEstudio(this.cred_estu_id.value).subscribe((data: any) => {
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

  getTipoEstudioOpcion() {
    this.spinner.show();

    this._credEstudioTipo.getCredTipos().subscribe((data) => {
      this.dataTipoEstudioOpcion = data;
      this.spinner.hide()
    })
  }

  getInfoCliente() {
    this._formulariosService.getInfoCliente(this.cliente.value).subscribe((data) => {
      this.dataCliente = data;
      if (this.dataCliente) {
        this.cli_plazo = this.dataCliente[0].cli_pp_sistema + ' días';
        this.cli_asesor = this.dataCliente[0].cli_asesor_nombre;
        this.cli_nombre = this.dataCliente[0].cli_nombre;
      }
    })
  }

  //Carga de documentos Comercial
  getDocumentosOpcion() {
    this.spinner.show();

    this._documentoCred.getCredDocumentos().subscribe((data: any) => {
      this.dataDocumentoOption = data;
      this.spinner.hide();
    })
  }

  getListDocumentos() {
    this.spinner.show();
    this._documentoEstuCred.getCredDocsEstu(this.cred_estu_id.value).subscribe((data: any) => {
      this.dataSource.data = data;
      this.spinner.hide();
    })
  }

  agregarDocumentoBoton() {
    this.documentoNuevo = true;
    this.documentoModificar = false;
  }

  cancelarDocumentoBoton() {
    this.documentoNuevo = false;
    this.documentoModificar = false;
    this.documento.setValue('');
  }

  getDocumentoNombre(id: any) {
    this.spinner.show();

    this._documentoCred.getCredDocumento(id).subscribe((data: any) => {
      this.dataDocumento = data;
      this.doc_nombre = this.dataDocumento.cred_doc_nombre;
      this.spinner.hide();
    })
  }

  getFile(event: any) {
    const [file] = event.target.files;

    const ext = file.name.split('.').pop();
    const nombre = this.doc_nombre.replace(/ /g, "_");
    this.fileTmp = {
      fileRaw: file,
      fileName: `${nombre}${this.cred_estu_id.value}.${ext}`
    }
  }

  sendFile(boolean: boolean) {
    this.spinner.show();
    const body = new FormData();

    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName);

    this._credEstudio.archivoGuardar(body).subscribe(res => {
      if (boolean) {
        this.agregarDocumento(res.url);
      } else {
        this.modificarDocumento(res.url);
      }

      this.toastr.success(`El archivo de credito "${this.fileTmp.fileName}" se guardo exitosamente`, 'Archivo guardado');
      this.spinner.hide();
    });
  }

  agregarDocumento(url: any) {
    this.spinner.show();

    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_doc_id: this.documento.value,
      cred_estu_doc_url: url
    }
    this._documentoEstuCred.postCredDocEstu(body).subscribe(() => {
      this.toastr.success(`Documento Agregado al estudio de credito`, `Documento Agregado`);
      this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}/${this.cred_esta_id.value}`]);
      this.cancelarDocumentoBoton();
      this.spinner.hide();
    });
  }

  eliminarDocumento(id: any) {
    this.spinner.show();

    this._documentoEstuCred.deleteCredDocEstu(id).subscribe((data: any) => {
      const mensaje = data.msg;
      this.toastr.warning(mensaje, 'Eliminación de Documento');
      this.spinner.hide();
    });
  }

  traerDocumento(id: any) {
    this.spinner.show();
    this.documentoModificar = true;
    this.documentoNuevo = false;
    this.cred_estu_doc_id.setValue(id);

    this._documentoEstuCred.getCredDocEstu(id).subscribe((data: any) => {
      this.dataDocumentoEstu = data;
      this.documento.setValue(this.dataDocumentoEstu.cred_doc_id);
      this.getDocumentoNombre(this.dataDocumentoEstu.cred_doc_id);
      this.spinner.hide();
    })
  }

  modificarDocumento(url: any) {
    this.spinner.show();

    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_doc_id: this.documento.value,
      cred_estu_doc_url: url
    }

    this._documentoEstuCred.updateCredDocEstu(this.cred_estu_doc_id.value, body).subscribe((data: any) => {
      const mensaje = data.msg;
      this.toastr.success(mensaje, 'Documento Modificado Exitosamente');
      this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}`]);
      this.cancelarDocumentoBoton();
      this.spinner.hide();
    })
  }

  //Confirmacion de eliminacion Documento
  openDialog(cred_estu_doc_id: any, cred_doc_nombre: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      data: { title: 'Eliminación De Documento Credito', mensaje: `Esta de acuerdo con eliminar el "documento: ${cred_doc_nombre}" del estudio de credito?` }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.eliminarDocumento(cred_estu_doc_id);
      } else {
        this.toastr.info('Documento no eliminado del Estudio de Credito', 'Cancelar Eliminación Documento');
      }
    })
  }

  //Estados del credito
  crearEstadoCred(body: any) {
    this.spinner.show();

    this._estadoEstudioCred.postEstadoEstudio(body).subscribe((data: any) => {
      const mensaje = data.msg

      this.toastr.success(mensaje, 'Estado del Estudio Actualizado');
      this.router.navigate(['/EstudioCreditos']);
      this.spinner.hide();
    })
  }

  modificarEstadoCred(id:any) {
    this.spinner.show();
    const body = {
      cred_esta_estu_fecha_fin: new Date()
    }
    this._estadoEstudioCred.updateEstadoEstudio(id,body).subscribe(()=>{
      this.spinner.hide();
    });
  }

  getLastEstado() {
    this.spinner.show();

    this._estadoEstudioCred.getLastEstadoByEstudio(this.cred_estu_id.value).subscribe((data:any)=>{
      const [ ultimoEstadoId ] = data;
      this.modificarEstadoCred(ultimoEstadoId.cred_esta_estu_id); 
      this.spinner.hide();
    });
  }

  numeroDocumentos(pasar: boolean) {
    const docCargado = this.dataSource.data.length;
    const docTotal = this.dataDocumentoOption.length;
    if (docCargado == docTotal) {
      this.todosDocumentos = true;
      this.toastr.success('Y yo que me alegro', 'Todo bien, todo correcto');
      this.pasarEtapa(pasar);
    } else {
      this.todosDocumentos = false;
      if (docCargado < docTotal) {
        this.toastr.error('Faltan documentos para realizar esta acción', 'Error al cambiar el estado');
      } else {
        this.toastr.error('Existen mas documentos de los requeridos', 'Error al cambiar el estado');
      }
    }
  }

  pasarEtapa(boolean: boolean){
    let estado: number;
    if(boolean){
      estado = Number(this.cred_esta_id.value) + 1;
    }else{
      estado = Number(this.cred_esta_id.value) - 1;
    }
    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_esta_id: estado,
      cred_esta_estu_fecha: new Date()
    }
    this.getLastEstado();
    this.crearEstadoCred(body);
  }

  estadoComercial(){
    console.log(this.estado_comercial.value);
  }
}
