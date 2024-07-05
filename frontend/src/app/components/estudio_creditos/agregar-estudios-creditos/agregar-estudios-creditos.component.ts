import { Component, ViewChild } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
import { jwtDecode } from 'jwt-decode';
import { EstadoCreditoService } from '../../../services/estudio-creditos/estado-credito.service';
import { CargosService } from '../../../services/cargos/cargos.service';
import { UsuariosService } from '../../../services/accesos/usuarios.service';

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

  // get obserDirectorCom() {
  //   return this.formEstudio.get('obserDirectorCom') as FormControl
  // }

  // get estado_comercial() {
  //   return this.formEstudio.get('estado_comercial') as FormControl
  // }

  get obserContabilidad() {
    return this.formEstudio.get('obserContabilidad') as FormControl
  }

  get plazoAprobado() {
    return this.formEstudio.get('plazoAprobado') as FormControl
  }

  get cupoAprobado() {
    return this.formEstudio.get('cupoAprobado') as FormControl
  }

  get obserGerencia() {
    return this.formEstudio.get('obserGerencia') as FormControl
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
    //'obserDirectorCom': new FormControl(''),
    // 'estado_comercial': new FormControl(''),
    'obserContabilidad': new FormControl(''),
    'plazoAprobado': new FormControl(''),
    'cupoAprobado': new FormControl(''),
    'obserGerencia': new FormControl('')
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

  get etapa() {
    return this.formAreasEmpresa.get('etapa') as FormControl
  }

  get cargo() {
    return this.formAreasEmpresa.get('cargo') as FormControl
  }

  formAreasEmpresa = new FormGroup({
    'etapa': new FormControl('', Validators.required),
    'cargo': new FormControl('', Validators.required)
  });


  cli_plazo: string = '';
  cli_asesor: string = '';
  cli_nombre: string = '';

  public loading: boolean | any;
  public documentoNuevo: boolean = false;
  public documentoModificar: boolean = false;
  public botonDocumento: boolean = true;

  contadorDes = 0;
  contadorObserDirector = 0;
  contadorObserContable = 0;
  contadorObserGerencia = 0;

  dataTipoEstudioOpcion: any;
  dataClienteOpcion: any;
  dataCliente: any;
  dataDocumentoOption: any;
  dataDocumento: any;
  dataDocumentoEstu: any;
  dataUsuario: any;
  dataEtapaOption: any;
  dataCargosOption: any;
  doc_nombre: any;
  data: any;
  pqrs_id: any;
  fileTmp: any;

  title: string = '';
  botonFinal: string = '';
  funcionFinal: any;

  public documentos: boolean = false;
  public crearDoc: boolean = false;
  public todosDocumentos: boolean = false; //Comprobar que estan todos los documentos antes de entrar
  public labelsComercial: boolean = false;
  public dirComercial: boolean = false;
  public contabilidad: boolean = false;
  public gerencia: boolean = false;
  public cambiarEtapa: boolean = false;
  public agregar: boolean = false;
  public modificar: boolean = false;
  public ver: boolean = false;

  constructor(private _formulariosService: FormulariosService,
    private _credEstudioTipo: TipoEstudioCreditosService,
    private _credEstudio: EstudioCreditosService,
    private _documentoEstuCred: DocumentoEstudioCreditosService,
    private _documentoCred: DocumentoCreditosService,
    private _estadoEstudioCred: EstadoEstudioCreditoService,
    private _estadoCredService: EstadoCreditoService,
    private _cargoServices: CargosService,
    private _usuarioServices: UsuariosService,
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

    this.crearOrModificarOrVerEstudio(this.cred_estu_id.value, this.cred_esta_id.value);
  }

  crearOrModificarOrVerEstudio(cred_estu_id: any, cred_esta_id: any) {
    const ruta = this.activatedRoute.snapshot.url[0].path;
    if (cred_estu_id == null) {
      this.title = 'Agregar';
      this.botonFinal = 'Registrar y Continuar';
      this.documentos = false;
      this.agregar = true;
      this.getClienteOpcion();
      this.getTipoEstudioOpcion();
    } else {
      if (ruta == 'VerEstudioCreditos') {
        this.title = 'Ver';
        this.documentos = false;
        this.botonDocumento = false;
        this.crearDoc = true;
        this.ver = true;
        this.labelsComercial = true;
        this.getClienteOpcion();
        this.getTipoEstudioOpcion();
        this.getDocumentosOpcion();
        this.getCredEstudio();
        this.getListEtapas();
        this.getListDocumentos();
        this.formSwitchByEstado('0');
      } else {
        this.title = 'Modificar';
        this.botonFinal = 'Actualizar';
        this.crearDoc = true;
        this.modificar = true;
        this.documentos = true;
        this.getClienteOpcion();
        this.getTipoEstudioOpcion();
        this.getDocumentosOpcion();
        this.getCredEstudio();
        this.getListEtapas();
        this.getListDocumentos();
        if (cred_esta_id > 1) {
          this.botonDocumento = false;
          this.labelsComercial = true;
          this.formSwitchByEstado(cred_esta_id);
          if (cred_esta_id >= 2) {
            this.documentos = false;
          }
        }
      }
    }
  }

  formSwitchByEstado(option: any) {
    if (option >= 4) {
      this.dirComercial = true;
      this.contabilidad = true;
      this.gerencia = true;
      this.formEstudio = new FormGroup({
        'cred_estu_id': new FormControl({ value: '', disabled: true }),
        'cliente': new FormControl({ value: '', disabled: true }),
        'tipo': new FormControl({ value: '', disabled: true }),
        'obserComercial': new FormControl({ value: '', disabled: true }),
        'cliente_desde': new FormControl({ value: '', disabled: true }),
        'cupo_actual': new FormControl({ value: '', disabled: true }),
        'descuento': new FormControl({ value: '', disabled: true }),
        'cred_esta_id': new FormControl({ value: '', disabled: true }),
        // 'obserDirectorCom': new FormControl({ value: '', disabled: true }),
        // 'estado_comercial': new FormControl({ value: '', disabled: true }),
        'obserContabilidad': new FormControl({ value: '', disabled: true }),
        'plazoAprobado': new FormControl({ value: '', disabled: true }),
        'cupoAprobado': new FormControl({ value: '', disabled: true }),
        'obserGerencia': new FormControl({ value: '', disabled: true })
      });
    } else {
      switch (option) {
        case '0':
          this.dirComercial = true;
          this.contabilidad = true;
          this.gerencia = true;
          this.formEstudio = new FormGroup({
            'cred_estu_id': new FormControl({ value: '', disabled: true }),
            'cliente': new FormControl({ value: '', disabled: true }),
            'tipo': new FormControl({ value: '', disabled: true }),
            'obserComercial': new FormControl({ value: '', disabled: true }),
            'cliente_desde': new FormControl({ value: '', disabled: true }),
            'cupo_actual': new FormControl({ value: '', disabled: true }),
            'descuento': new FormControl({ value: '', disabled: true }),
            'cred_esta_id': new FormControl({ value: '', disabled: true }),
            // 'obserDirectorCom': new FormControl({ value: '', disabled: true }),
            // 'estado_comercial': new FormControl({ value: '', disabled: true }),
            'obserContabilidad': new FormControl({ value: '', disabled: true }),
            'plazoAprobado': new FormControl({ value: '', disabled: true }),
            'cupoAprobado': new FormControl({ value: '', disabled: true }),
            'obserGerencia': new FormControl({ value: '', disabled: true })
          });
          break;
        case '2':
          this.dirComercial = true;
          this.contabilidad = true;
          this.formEstudio = new FormGroup({
            'cred_estu_id': new FormControl({ value: '', disabled: true }),
            'cliente': new FormControl({ value: '', disabled: true }),
            'tipo': new FormControl({ value: '', disabled: true }),
            'obserComercial': new FormControl({ value: '', disabled: true }),
            'cliente_desde': new FormControl({ value: '', disabled: true }),
            'cupo_actual': new FormControl({ value: '', disabled: true }),
            'descuento': new FormControl({ value: '', disabled: true }),
            'cred_esta_id': new FormControl({ value: '', disabled: true }),
            // 'obserDirectorCom': new FormControl({ value: '', disabled: true }),
            // 'estado_comercial': new FormControl({ value: '', disabled: true }),
            'obserContabilidad': new FormControl('', Validators.max(5000)),
            'plazoAprobado': new FormControl(''),
            'cupoAprobado': new FormControl(''),
            'obserGerencia': new FormControl('')
          });
          break;
        case '3':
          this.dirComercial = true;
          this.contabilidad = true;
          this.gerencia = true;
          this.formEstudio = new FormGroup({
            'cred_estu_id': new FormControl({ value: '', disabled: true }),
            'cliente': new FormControl({ value: '', disabled: true }),
            'tipo': new FormControl({ value: '', disabled: true }),
            'obserComercial': new FormControl({ value: '', disabled: true }),
            'cliente_desde': new FormControl({ value: '', disabled: true }),
            'cupo_actual': new FormControl({ value: '', disabled: true }),
            'descuento': new FormControl({ value: '', disabled: true }),
            'cred_esta_id': new FormControl({ value: '', disabled: true }),
            // 'obserDirectorCom': new FormControl({ value: '', disabled: true }),
            // 'estado_comercial': new FormControl({ value: '', disabled: true }),
            'obserContabilidad': new FormControl({ value: '', disabled: true }),
            'plazoAprobado': new FormControl('', Validators.max(999)),
            'cupoAprobado': new FormControl('', Validators.max(999999999)),
            'obserGerencia': new FormControl('', Validators.maxLength(5000))
          });
          break;
        default:
          break;
      }
    }
  }

  /*Datos del estudio de credito Comercial*/
  crearCredEstudio() {
    this.spinner.show();
    this.loading = true;
    let decodeToken: any;
    const token = localStorage.getItem('token');

    if (token) {
      decodeToken = jwtDecode(token);
    }

    const usu_id = decodeToken.codigo;

    const body = {
      cred_fecha_creacion: new Date(),
      cli_id: this.cliente.value,
      cred_tipo_id: this.tipo.value,
      cred_obser_comercial: this.obserComercial.value,
      cred_cliente_desde: this.cliente_desde.value,
      cred_cupo_actual: this.cupo_actual.value,
      cred_descuento_otorgado: this.descuento.value,
      usu_id: usu_id
    }

    this._credEstudio.postCredEstudio(body).subscribe((data: any) => {
      const mensaje = data.msg;
      this.toastr.success(mensaje, 'Registro Estudio de Credito');
      this._credEstudio.getLastCredEstudio().subscribe((data: any) => {
        const [dataEstu] = data;
        this.cred_estu_id.setValue(dataEstu.cred_estu_id);

        this.correoCreaCredEstu(this.cred_estu_id.value);

        const body_estado = {
          cred_estu_id: this.cred_estu_id.value,
          cred_esta_id: 1,
          cred_esta_estu_fecha: new Date()
        }
        this.crearEstadoCred(body_estado);
        this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}`]);
      });
      this.loading = false;
      this.spinner.hide();
    });

  }

  correoCreaCredEstu(id: any) {
    const user = localStorage.getItem('user');
    const usuario: any = JSON.parse(user ? user : '');

    const fecha = new Date();
    const isoString = fecha.toISOString();
    const dateString = isoString.slice(0, 10);

    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    let saludo = '';

    if (hora < 12) {
      saludo = 'Buenos días';
    } else if (hora < 18) {
      saludo = 'Buenas tardes';
    } else {
      saludo = 'Buenas noches';
    }

    const body = {
      saludos: saludo,
      carg_correo: usuario.carg_correo,
      cargo: usuario.carg_nombre,
      cred_fecha_creacion: dateString,
      hora_creacion: `${hora}:${minutos}:${segundos}`,
      cred_estu_id: id
    }

    console.log(body);
    this._credEstudio.correoCreaCredEstu(body).subscribe(() => {
      this.toastr.success(`Notificación Enviada al correo: ${usuario.carg_correo}`, 'Notificación Enviada');
    })
  }

  modificarCredEstudio() {
    this.spinner.show();
    this.loading = true;
    const body = {
      cli_id: this.cliente.value,
      cred_tipo_id: this.tipo.value,
      cred_obser_comercial: this.obserComercial.value,
      cred_cliente_desde: this.cliente_desde.value,
      cred_cupo_actual: this.cupo_actual.value,
      cred_descuento_otorgado: this.descuento.value,
      //cred_obser_dirComercial: this.obserDirectorCom.value,
      cred_obser_contabilidad: this.obserContabilidad.value,
      cred_plazo_aprobado: this.plazoAprobado.value,
      cred_cupo_aprobado: this.cupoAprobado.value,
      cred_obser_gerencia: this.obserGerencia.value
    }
    this._credEstudio.updateCredEstudio(this.cred_estu_id.value, body).subscribe((data: any) => {
      const mensaje = data.msg;

      this.toastr.success(mensaje, 'Actualizar Estudio Credito');
      this.router.navigate(['/EstudioCreditos']);
      this.loading = false;
      this.spinner.hide();
    });
  }

  getCredEstudio() {
    this.spinner.show();
    this._credEstudio.getCredEstudio(this.cred_estu_id.value).subscribe((data: any) => {
      this.data = data;
      this.cliente.setValue(this.data.cli_id);
      this.getInfoCliente();
      this.tipo.setValue(this.data.cred_tipo_id);
      this.obserComercial.setValue(this.data.cred_obser_comercial);
      this._usuarioServices.getUsuarioInfo(this.data.usu_id).subscribe((data: any) => {
        [this.dataUsuario] = data;
      });
      this.contadorDes = this.data.cred_obser_comercial.length || 0;
      this.cliente_desde.setValue(this.data.cred_cliente_desde);
      this.cupo_actual.setValue(this.data.cred_cupo_actual);
      this.descuento.setValue(this.data.cred_descuento_otorgado);
      //this.obserDirectorCom.setValue(this.data.cred_obser_dirComercial);
      //this.contadorObserDirector = this.data.cred_obser_dirComercial.length || 0;
      this.obserContabilidad.setValue(this.data.cred_obser_contabilidad);
      this.contadorObserContable = this.data.cred_obser_contabilidad.length || 0;
      this.plazoAprobado.setValue(this.data.cred_plazo_aprobado);
      this.cupoAprobado.setValue(this.data.cred_cupo_aprobado);
      this.obserGerencia.setValue(this.data.cred_obser_gerencia);
      this.contadorObserGerencia = this.data.cred_obser_gerencia || 0;

    });
  }

  onKeyobserComercial(event: any) {
    this.contadorDes = event.target.value.length;
  }

  onKeyObserDirector(event: any) {
    this.contadorObserDirector = event.target.value.length;
  }

  onKeyObserContabilidad(event: any) {
    this.contadorObserContable = event.target.value.length;
  }

  onKeyObserGerencia(event: any) {
    this.contadorObserGerencia = event.target.value.length;
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

  /*Carga de documentos Comercial*/
  getDocumentosOpcion() {
    this.spinner.show();

    this._documentoCred.getCredDocumentos().subscribe((data: any) => {
      this.dataDocumentoOption = data;
      this.spinner.hide();
    })
  }

  getListDocumentos() {
    this.spinner.show();
    this.loading = false;
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
    this.loading = true;
    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_doc_id: this.documento.value,
      cred_estu_doc_url: url
    }
    this._documentoEstuCred.postCredDocEstu(body).subscribe(() => {
      this.toastr.success(`Documento Agregado al estudio de credito`, `Documento Agregado`);
      this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}/${this.cred_esta_id.value}`]);
      this.cancelarDocumentoBoton();
      this.loading = false;
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
    this.loading = true;

    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_doc_id: this.documento.value,
      cred_estu_doc_url: url
    }

    this._documentoEstuCred.updateCredDocEstu(this.cred_estu_doc_id.value, body).subscribe((data: any) => {
      const mensaje = data.msg;
      this.toastr.success(mensaje, 'Documento Modificado Exitosamente');
      this.router.navigate([`/ModificarEstudioCreditos/${this.cred_estu_id.value}/${this.cred_esta_id.value}`]);
      this.cancelarDocumentoBoton();
      this.loading = false;
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

  /*Estados del credito*/
  crearEstadoCred(body: any) {
    this.spinner.show();
    this.loading = true;
    this._estadoEstudioCred.postEstadoEstudio(body).subscribe((data: any) => {
      const mensaje = data.msg
      this.toastr.success(mensaje, 'Estado del Estudio Actualizado');
      this.router.navigate(['/EstudioCreditos']);
      this.loading = false
      this.spinner.hide();
    })
  }

  modificarEstadoCred(id: any) {
    this.spinner.show();
    this.loading = true;
    const body = {
      cred_esta_estu_fecha_fin: new Date()
    }
    this._estadoEstudioCred.updateEstadoEstudio(id, body).subscribe(() => {
      this.loading = false;
      this.spinner.hide();
    });
  }

  getLastEstado() {

    this._estadoEstudioCred.getLastEstadoByEstudio(this.cred_estu_id.value).subscribe((data: any) => {
      const [ultimoEstadoId] = data;
      this.modificarEstadoCred(ultimoEstadoId.cred_esta_estu_id);
    });
  }

  getListEtapas() {
    this.spinner.show();

    this._estadoCredService.getListEstado().subscribe((data: any) => {
      this.dataEtapaOption = data;
      this.spinner.hide();
    })
  }

  getListCargoByArea(id: any) {
    this.spinner.show();

    this._cargoServices.getCargoByArea(id).subscribe((data: any) => {
      this.dataCargosOption = data;
      this.spinner.hide();
    });
  }

  traerAreaEmpresa(id: any) {
    const posicion = Number(id) - 1
    const area = this.dataEtapaOption[posicion].area_emp_id;
    this.getListCargoByArea(area);
  }

  numeroDocumentos() {
    this.loading = true;
    const docCargado = this.dataSource.data.length;
    const docTotal = this.dataDocumentoOption.length;
    if (docCargado == docTotal) {
      this.todosDocumentos = true;
      this.pasarEtapa();
    } else {
      this.todosDocumentos = false;
      this.loading = false;
      if (docCargado < docTotal) {
        this.toastr.error('Faltan documentos para realizar esta acción', 'Error al cambiar el estado');
      } else {
        this.toastr.error('Existen mas documentos de los requeridos', 'Error al cambiar el estado');
      }
    }
  }

  pasarEtapa() {
    this.spinner.show();
    const body = {
      cred_estu_id: this.cred_estu_id.value,
      cred_esta_id: this.etapa.value,
      cred_esta_estu_fecha: new Date(),
      carg_id: this.cargo.value
    }
    this.getLastEstado();
    setTimeout(() => {
      this.modificarCredEstudio();
      this.crearEstadoCred(body);
      this.correoEtapa();
      this.loading = false;
      this.spinner.hide();
    }, 1500);
  }

  // estadoComercial() {
  //   if (this.estado_comercial.value) {
  //     this.obserDirectorCom.setValue('Todo en orden')
  //   } else {
  //     this.obserDirectorCom.setValue('');
  //   }
  // }

  correoEtapa() {
    const fecha = new Date();
    const isoString = fecha.toISOString();
    const dateString = isoString.slice(0, 10);

    const hora = fecha.getHours();
    let saludo = '';
    let ruta = '';
    let cambioEtapa = '';

    if (this.cred_esta_id.value < this.etapa.value) {
      cambioEtapa = 'ha sido asignado';
    } else {
      cambioEtapa = 'ha sido devuelto';
    }

    if (this.etapa.value == 1) {
      ruta = 'ModificarEstudioCreditos';
    } else if (this.etapa.value == 2) {
      ruta = 'ModificarEstudioCreditosDirComercial/';
    } else if (this.etapa.value == 3) {
      ruta = 'ModificarEstudioCreditosContabilidad/';
    } else if (this.etapa.value == 4) {
      ruta = 'ModificarEstudioCreditosGerencia/';
    }

    if (hora < 12) {
      saludo = 'Buenos días';
    } else if (hora < 18) {
      saludo = 'Buenas tardes';
    } else {
      saludo = 'Buenas noches';
    }
    const cargoId = this.cargo.value;
    const [cargo] = this.dataCargosOption.filter(function (d: any) {
      return d.carg_id.toString().toLowerCase().indexOf(cargoId) !== -1 || !cargoId;
    });
    const etapaId = this.etapa.value;
    const [etapa] = this.dataEtapaOption.filter(function (d: any) {
      return d.cred_esta_id.toString().toLowerCase().indexOf(etapaId) !== -1 || !etapaId;
    });
    const tipoId = this.tipo.value;
    const [tipo] = this.dataTipoEstudioOpcion.filter(function (d: any) {
      return d.cred_tipo_id.toString().toLowerCase().indexOf(tipoId) !== -1 || !tipoId;
    })
    const body = {
      etapa: etapa.cred_esta_nombre,
      carg_correo: cargo.carg_correo,
      carg_correo_creador: this.dataUsuario.carg_correo,
      cambioEtapa: cambioEtapa,
      saludos: saludo,
      cli_nombre: this.cli_nombre,
      cargo: cargo.carg_nombre,
      cargo_creador: this.dataUsuario.carg_nombre,
      cred_estu_id: this.cred_estu_id.value,
      cred_esta_id: etapaId,
      tipo_estudio: tipo.cred_tipo_nombre,
      obserComercial: this.obserComercial.value,
      cli_asesor: this.cli_asesor,
      cliente_desde: this.cliente_desde.value,
      cupo_actual: this.cupo_actual.value,
      cli_plazo: this.cli_plazo,
      descuento: this.descuento.value,
      //obserDirectorCom: this.obserDirectorCom.value,
      obserContabilidad: this.obserContabilidad.value,
      plazoAprobado: this.plazoAprobado.value,
      cupoAprobado: this.cupoAprobado.value,
      obserGerencia: this.obserGerencia.value,
      ruta: ruta
    }
    this._credEstudio.correoEtapaEstuCred(body).subscribe();
    this._credEstudio.correoEtapaEstuCredCreador(body).subscribe();
  }
}
