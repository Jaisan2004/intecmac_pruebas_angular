import { Component, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormulariosService } from '../../../services/formularios/formularios.service';
import { PqrsService } from '../../../services/pqrs/pqrs/pqrs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-pqrs',
  templateUrl: './modificar-pqrs.component.html',
  styleUrl: './modificar-pqrs.component.css'
})
export class ModificarPqrsComponent {

  get id_pqrs() {
    return this.formPqrs.get('id_pqrs') as FormControl
  }

  get fecha_recepcion() {
    return this.formPqrs.get('fecha_recepcion') as FormControl
  }

  get cliente() {
    return this.formPqrs.get('cliente') as FormControl
  }

  get producto() {
    return this.formPqrs.get('producto') as FormControl
  }

  get lote() {
    return this.formPqrs.get('lote') as FormControl
  }

  get cantidad() {
    return this.formPqrs.get('cantidad') as FormControl
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
    'producto': new FormControl('', Validators.required),
    'lote': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'cantidad': new FormControl('', [Validators.required, Validators.max(9999999)]),
    'documento': new FormControl('', [Validators.required, Validators.maxLength(99)]),
    'imagen': new FormControl(''),
    'descripcion': new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    'analisis': new FormControl('', Validators.maxLength(5000)),
    'costo': new FormControl('', Validators.max(9999999999999999999)),
    'causa': new FormControl(''),
    'cargo': new FormControl(''),
    'tipo': new FormControl(''),
    'doc_cruce': new FormControl('', Validators.maxLength(200)),
    'estado': new FormControl('', Validators.required)
  });


  cli_zona: string = '';
  cli_asesor: string = '';
  public fileTmp: any;
  public previsualizacion: string | any;
  public loading: boolean | any;
  public cambiarImg: boolean = false;
  public recargar: boolean = false;

  contadorDes = 0;
  contadorAnalisis = 0;

  dataClienteOpcion: any;
  dataCliente: any;
  dataProductoOption: any;
  dataPqrsCausa: any;
  dataCargos: any;
  dataPqrsTipo: any;
  data: any;

  constructor(private _formulariosService: FormulariosService,
    private _pqrsService: PqrsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class
  }

  ngOnInit(): void {
    this.id_pqrs.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getPqrs();
    this.getClienteOpcion();
    this.getProductoOpcion();
    this.getPqrsCausaOption();
    this.getCargosOption();
    this.getPqrsTipoOption();
  }

  modificarPqrs() {
    const body = {
      pqrs_fecha_recepcion: this.fecha_recepcion.value,
      cli_id: this.cliente.value,
      prod_id: this.producto.value,
      pqrs_lote: this.lote.value,
      pqrs_prod_cantidad: this.cantidad.value,
      pqrs_doc: this.documento.value,
      pqrs_descripcion: this.descripcion.value,
      pqrs_analisis: this.analisis.value,
      costo: this.costo.value,
      pqrs_causa_raiz_id: this.causa.value,
      carg_id: this.cargo.value,
      pt_id: this.tipo.value,
      pqrs_fecha_respuesta: "",
      pqrs_dias_gestion: 0,
      pqrs_documento_cruce: this.doc_cruce.value,
      pqrs_estado: this.estado.value
    }
    this._pqrsService.updatePqrs(this.id_pqrs.value, body).subscribe(() => {

      this.toastr.success(`PQRS del asesor ${this.cli_asesor} se modifico exitosamente`, `Modificacion PQRS`)
      this.router.navigate(['/PQRS'])

    })
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
        console.log(res)
        const body = {
          filePath: res.url
        }
        if (!this.imagen.value) {
          this._pqrsService.updatePqrsImg(this.id_pqrs.value, body).subscribe(() => {
            
            this.recargar = true;
            this.toastr.success(`Imagen agregada exitosamente`, `Modificacion PQRS`)

            this.router.navigate([`/modificarPqrs/${this.id_pqrs.value}`])
            this.loading = false;

          })
        } else {
          this.previsualizacion = null;
          this.cambiarImg = false;
          this.imagen.setValue(res.url + '?t=' + new Date().getTime());
          this.loading = false
          this.toastr.success(`Imagen modificada exitosamente`, `Modificacion PQRS`)
        }
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
    this._pqrsService.getPqrs(this.id_pqrs.value).subscribe((data) => {
      this.data = data;
      this.fecha_recepcion.setValue(this.data.pqrs_fecha_recepcion);
      this.cliente.setValue(this.data.cli_id);
      this.producto.setValue(this.data.prod_id);
      this.lote.setValue(this.data.pqrs_lote);
      this.cantidad.setValue(this.data.pqrs_prod_cantidad);
      this.documento.setValue(this.data.pqrs_doc);
      this.imagen.setValue(this.data.pqrs_evidencia);
      this.descripcion.setValue(this.data.pqrs_descripcion);
      this.analisis.setValue(this.data.pqrs_analisis);
      this.costo.setValue(this.data.costo);
      this.causa.setValue(this.data.pqrs_causa_raiz_id);
      this.cargo.setValue(this.data.carg_id);
      this.tipo.setValue(this.data.pt_id);
      this.doc_cruce.setValue(this.data.pqrs_documento_cruce);
      this.estado.setValue(this.data.pqrs_estado);

      this.getInfoCliente();
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
