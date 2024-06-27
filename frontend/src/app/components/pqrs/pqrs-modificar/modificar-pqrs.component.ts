import { Component, ViewChild } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PqrsProductoService } from '../../../services/pqrs/pqrs-producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../aplicacion/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modificar-pqrs',
  templateUrl: './modificar-pqrs.component.html',
  styleUrl: './modificar-pqrs.component.css'
})
export class ModificarPqrsComponent {

  columns: any[] = [
    { name: 'Ref. Producto', titulo: 'Ref. Producto', prop: 'prod_ref' },
    { name: 'Producto', titulo: 'Producto', prop: 'prod_descripcion' },
    { name: 'lote', titulo: 'Lote', prop: 'lote' },
    { name: 'cantidad', titulo: 'Cant.', prop: 'cantidad' },
  ];

  displayedColumns: string[] = [
    'Ref. Producto',
    'Producto',
    'lote',
    'cantidad',
    'Acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get id_pqrs() {
    return this.formPqrs.get('id_pqrs') as FormControl
  }

  get fecha_recepcion() {
    return this.formPqrs.get('fecha_recepcion') as FormControl
  }

  get cliente() {
    return this.formPqrs.get('cliente') as FormControl
  }

  get documento() {
    return this.formPqrs.get('documento') as FormControl
  }

  get imagen() {
    return this.formPqrs.get('imagen') as FormControl
  }

  get descripcion() {
    return this.formPqrs.get('descripcion') as FormControl
  }

  get analisis() {
    return this.formPqrs.get('analisis') as FormControl
  }

  get costo() {
    return this.formPqrs.get('costo') as FormControl
  }

  get causa() {
    return this.formPqrs.get('causa') as FormControl
  }

  get cargo() {
    return this.formPqrs.get('cargo') as FormControl
  }

  get tipo() {
    return this.formPqrs.get('tipo') as FormControl
  }

  get fecha_respuesta() {
    return this.formPqrs.get('fecha_respuesta') as FormControl
  }


  get doc_cruce() {
    return this.formPqrs.get('doc_cruce') as FormControl
  }

  get estado() {
    return this.formPqrs.get('estado') as FormControl
  }

  formPqrs = new FormGroup({
    'id_pqrs': new FormControl({ value: '', disabled: true }),
    'fecha_recepcion': new FormControl({ value: '', disabled: true }),
    'cliente': new FormControl('', Validators.required),
    'documento': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'imagen': new FormControl(''),
    'descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'analisis': new FormControl('', Validators.maxLength(5000)),
    'costo': new FormControl('', Validators.max(9999999999999999999)),
    'causa': new FormControl(''),
    'cargo': new FormControl(''),
    'tipo': new FormControl(''),
    'fecha_respuesta': new FormControl({ value: '', disabled: true }),
    'doc_cruce': new FormControl('', Validators.maxLength(200)),
    'estado': new FormControl('', Validators.required)
  });

  get pqrs_prod_id(){
    return this.formProductoPqrs.get('pqrs_prod_id') as FormControl
  }

  get producto() {
    return this.formProductoPqrs.get('producto') as FormControl
  }

  get lote() {
    return this.formProductoPqrs.get('lote') as FormControl
  }

  get cantidad() {
    return this.formProductoPqrs.get('cantidad') as FormControl
  }

  formProductoPqrs = new FormGroup({
    'pqrs_prod_id': new FormControl({ value: '', disabled: true }),
    'producto': new FormControl('', Validators.required),
    'lote': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'cantidad': new FormControl('', [Validators.required, Validators.max(9999999)])
  });


  cli_zona: string = '';
  cli_asesor: string = '';
  title: string = '';
  public fileTmp: any;
  public previsualizacion: string | any;
  public loading: boolean | any;
  public cambiarImg: boolean = false;
  public labelPqrs: boolean = false;
  public productoNuevo: boolean = false;
  public productoModificar: boolean = false;
  public pqrsModificar: boolean = false;
  public pqrsVer: boolean = false;



  contadorDes = 0;
  contadorAnalisis = 0;

  dataClienteOpcion: any;
  dataCliente: any;
  dataProductoOption: any;
  dataProducto: any;
  dataPqrsCausa: any;
  dataCargos: any;
  mensaje:any;
  dataPqrsTipo: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _pqrsService: PqrsService,
    private _pqrsProducto: PqrsProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.id_pqrs.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getPqrs();
    this.getClienteOpcion();
    this.getProductoOpcion();
    this.getPqrsCausaOption();
    this.getCargosOption();
    this.getPqrsTipoOption();
    this.getInfoProducto();
    this.modificarOrVerPqrs();

    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Registros por página";
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  modificarOrVerPqrs() {
    const ruta = this.activatedRoute.snapshot.url[0].path;
    if(ruta == 'VerPqrs'){
      this.title = 'Ver';
      this.pqrsVer=true;
      this.pqrsModificar = false;
      this.labelPqrs = true;
      this.formPqrs = new FormGroup({
        'id_pqrs': new FormControl({ value: '', disabled: true }),
        'fecha_recepcion': new FormControl({ value: '', disabled: true }),
        'cliente': new FormControl({ value: '', disabled: true }),
        'documento': new FormControl({ value: '', disabled: true }),
        'imagen': new FormControl({ value: '', disabled: true }),
        'descripcion': new FormControl({ value: '', disabled: true }),
        'analisis': new FormControl({ value: '', disabled: true }),
        'costo': new FormControl({ value: '', disabled: true }),
        'causa': new FormControl({ value: '', disabled: true }),
        'cargo': new FormControl({ value: '', disabled: true }),
        'tipo': new FormControl({ value: '', disabled: true }),
        'fecha_respuesta': new FormControl({ value: '', disabled: true }),
        'doc_cruce': new FormControl({ value: '', disabled: true }),
        'estado': new FormControl({ value: '', disabled: true })
      });
      this.formProductoPqrs = new FormGroup({
        'pqrs_prod_id': new FormControl({ value: '', disabled: true }),
        'producto': new FormControl({ value: '', disabled: true }),
        'lote': new FormControl({ value: '', disabled: true }),
        'cantidad': new FormControl({ value: '', disabled: true })
      });
    }else{
      this.title = 'Modificar';
      this.pqrsVer = false;
      this.pqrsModificar = true;
      this.labelPqrs = false;
    }
  }

  modificarPqrs() {
    this.spinner.show()
    this.loading = true;
    let body = {};
    if (this.estado.value == 2) {
      if (this.fecha_respuesta.value == '0000-00-00') {
        body = {
          pqrs_fecha_recepcion: this.fecha_recepcion.value,
          cli_id: this.cliente.value,
          pqrs_doc: this.documento.value,
          pqrs_descripcion: this.descripcion.value,
          pqrs_analisis: this.analisis.value,
          costo: this.costo.value,
          pqrs_causa_raiz_id: this.causa.value,
          carg_id: this.cargo.value,
          pt_id: this.tipo.value,
          pqrs_fecha_respuesta: new Date(),
          pqrs_documento_cruce: this.doc_cruce.value,
          pqrs_estado: this.estado.value
        }
      } else {
        body = {
          pqrs_fecha_recepcion: this.fecha_recepcion.value,
          cli_id: this.cliente.value,
          pqrs_doc: this.documento.value,
          pqrs_descripcion: this.descripcion.value,
          pqrs_analisis: this.analisis.value,
          costo: this.costo.value,
          pqrs_causa_raiz_id: this.causa.value,
          carg_id: this.cargo.value,
          pt_id: this.tipo.value,
          pqrs_fecha_respuesta: this.fecha_respuesta.value,
          pqrs_documento_cruce: this.doc_cruce.value,
          pqrs_estado: this.estado.value
        }
      }
    } else if (this.estado.value == 1) {
      body = {
        pqrs_fecha_recepcion: this.fecha_recepcion.value,
        cli_id: this.cliente.value,
        pqrs_doc: this.documento.value,
        pqrs_descripcion: this.descripcion.value,
        pqrs_analisis: this.analisis.value,
        costo: this.costo.value,
        pqrs_causa_raiz_id: this.causa.value,
        carg_id: this.cargo.value,
        pt_id: this.tipo.value,
        pqrs_fecha_respuesta: '',
        pqrs_documento_cruce: this.doc_cruce.value,
        pqrs_estado: this.estado.value
      }
    }

    this._pqrsService.updatePqrs(this.id_pqrs.value, body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`PQRS del asesor ${this.cli_asesor} se modifico exitosamente`, `Modificacion PQRS`)
      this.router.navigate(['/Pqrs'])
      this.spinner.hide();

    });
  }

  agregarProductoPqrs() {
    this.spinner.show();

    const body = {
      pqrs_id: this.id_pqrs.value,
      prod_id: this.producto.value,
      lote: this.lote.value,
      cantidad: this.cantidad.value
    }
    this._pqrsProducto.postProductoPqrs(body).subscribe(() => {
      this.toastr.success(`Producto Agregado a la PQRS ${this.id_pqrs.value}`, `Producto Agregado`);
      this.router.navigate([`/ModificarPqrs/${this.id_pqrs.value}`]);
      this.productoNuevo = false;
      this.producto.setValue('');
      this.lote.setValue('');
      this.cantidad.setValue('');
      this.spinner.hide();
    });
  }

  modificarProductoPqrs() {
    this.spinner.show();

    const body = {
      pqrs_id: this.id_pqrs.value,
      prod_id: this.producto.value,
      lote: this.lote.value,
      cantidad: this.cantidad.value
    }

    this._pqrsProducto.updateProductoPqrs(this.pqrs_prod_id.value, body).subscribe(() => {
      this.toastr.success(`Producto Actualizado Exitosamente en la PQRS ${this.id_pqrs.value}`, `Producto Actualizado`);
      this.router.navigate([`/ModificarPqrs/${this.id_pqrs.value}`]);
      this.productoModificar = false;
      this.producto.setValue('');
      this.lote.setValue('');
      this.cantidad.setValue('');
      this.spinner.hide();
    });
  }

  eliminarProductoPqrs(prod_id:any){
    this.spinner.show();

    this._pqrsProducto.deleteProductoPqrs(prod_id).subscribe((data:any)=>{
      this.mensaje = data.msg;
      this.toastr.warning(this.mensaje, `Eliminacion Producto PQRS`);
      this.spinner.hide();
    })
  }

  traerProducto(pp_id: any){
    this.productoModificar = true;
    this.productoNuevo = false;
    this._pqrsProducto.getProductoPqrs(pp_id).subscribe((data) =>{
      this.dataProducto = data;

      this.pqrs_prod_id.setValue(this.dataProducto.pqrs_productos_id);
      this.producto.setValue(this.dataProducto.prod_id);
      this.lote.setValue(this.dataProducto.lote);
      this.cantidad.setValue(this.dataProducto.cantidad);
    })
  }

  openDialog(prod_id:any, prod_nombre:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      data: {title: 'Eliminación Producto de PQRS', mensaje:`Esta de acuerdo con eliminar el producto: "${prod_nombre}" de la PQRS?`}
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.eliminarProductoPqrs(prod_id);
      }else{
        this.toastr.info(`El producto no fue eliminado de la PQRS`, `Cancelar Eliminación de Producto`)
      }
    })
  }

  agregarProductoBoton(){
    this.productoModificar = false;
    this.productoNuevo =  true;
  }

  cancelarProductoBoton(){
    this.productoModificar =  false;
    this.productoNuevo = false;
    this.producto.setValue('');
    this.lote.setValue('');
    this.cantidad.setValue('');
  }

  capturarFile(event: any) {
    const archivoCapturado = event.target.files[0];
    console.log(archivoCapturado)
    this.extraerBase64(archivoCapturado).then((image: any) => {
      this.previsualizacion = image.base;
      console.log(image)
    })
    const ext = archivoCapturado.name.split('.').pop();
    this.fileTmp = {
      fileRaw: archivoCapturado,
      fileName: `EvidenciaPqrs${this.id_pqrs.value}.${ext}`
    };

  }
  cancelarCapturarFile() {
    this.previsualizacion = null;
    this.cambiarImg = false;
  }

  subirArchivo() {
    try {
      this.loading = true;
      const body = new FormData();
      body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName)
      this._pqrsService.PqrsImg(body).subscribe(res => {
        const body = {
          filePath: res.url + '?t=' + new Date().getTime()
        }
        this._pqrsService.updatePqrsImg(this.id_pqrs.value, body).subscribe(() => {

          this.previsualizacion = null;
          this.cambiarImg = false;
          this.toastr.success(`Imagen agregada exitosamente`, `Modificacion PQRS`)

          this.router.navigate([`/ModificarPqrs/${this.id_pqrs.value}`])
          this.loading = false;

        })
      });

    } catch (error) {
      this.loading = false
      console.log('ERROR', error);
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject): void => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      };
    } catch (error) {
      null;
    }
  })


  getPqrs() {
    this.spinner.show()
    this._pqrsService.getPqrs(this.id_pqrs.value).subscribe((data) => {
      this.data = data;
      this.fecha_recepcion.setValue(this.data.pqrs_fecha_recepcion);
      this.cliente.setValue(this.data.cli_id);
      this.documento.setValue(this.data.pqrs_doc);
      this.imagen.setValue(this.data.pqrs_evidencia);
      this.descripcion.setValue(this.data.pqrs_descripcion);
      this.analisis.setValue(this.data.pqrs_analisis);
      this.costo.setValue(this.data.costo);
      this.causa.setValue(this.data.pqrs_causa_raiz_id);
      this.cargo.setValue(this.data.carg_id);
      this.tipo.setValue(this.data.pt_id);
      this.fecha_respuesta.setValue(this.data.pqrs_fecha_respuesta);
      this.doc_cruce.setValue(this.data.pqrs_documento_cruce);
      this.estado.setValue(this.data.pqrs_estado);
      this.contadorDes = this.descripcion.value?.length||0;
      this.contadorAnalisis = this.analisis.value?.length||0;
      this.getInfoCliente();
      this.spinner.hide()
    })
  }

  getInfoProducto() {
    this._pqrsProducto.getProductosPqrs(this.id_pqrs.value).subscribe((data: any) => {
      this.dataSource.data = data;
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

  getInfoCliente() {
    this._formulariosService.getInfoCliente(this.cliente.value).subscribe((data) => {
      this.dataCliente = data;
      if (this.dataCliente) {
        this.cli_zona = this.dataCliente[0].zona;
        this.cli_asesor = this.dataCliente[0].cli_asesor_nombre;
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
