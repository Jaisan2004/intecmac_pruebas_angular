import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoService } from '../../../services/producto/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {

  get prod_ref() {
    return this.formProducto.get('prod_ref') as FormControl
  }
  get prod_descripcion() {
    return this.formProducto.get('prod_descripcion') as FormControl
  }

  get prod_presentacion() {
    return this.formProducto.get('prod_presentacion') as FormControl
  }

  get prod_und_vta_x_carton() {
    return this.formProducto.get('prod_und_vta_x_carton') as FormControl
  }

  get prod_iva() {
    return this.formProducto.get('prod_iva') as FormControl
  }

  formProducto = new FormGroup({
    'prod_ref': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'prod_descripcion': new FormControl('', [Validators.required, Validators.maxLength(500)]),
    'prod_presentacion': new FormControl('', [Validators.required, Validators.maxLength(500)]),
    'prod_und_vta_x_carton': new FormControl('', [Validators.required, Validators.max(999999)]),
    'prod_iva': new FormControl('', [Validators.required, Validators.max(100)])
  });


  cli_zona: string = '';
  cli_asesor: string = '';
  cli_nombre: string = '';

  public loading: boolean | any;
  mensaje:any;

  dataClienteOpcion: any;
  dataCliente: any;
  data: any;
  pqrs_id: any;

  constructor(private _productosService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  crearProducto() {
    this.spinner.show();
    this.loading = true;

    const body = {
      prod_id: null,
      prod_ref: this.prod_ref.value,
      prod_descripcion: this.prod_descripcion.value,
      prod_presentacion: this.prod_presentacion.value,
      prod_und_vta_x_carton: this.prod_und_vta_x_carton.value,
      prod_iva: this.prod_iva.value,
    }

    this._productosService.postProducto(body).subscribe((data:any) => {
      this.mensaje = data.msg;
      this.loading = false;
      this.toastr.success(`${this.mensaje}`, `Registro Producto`);
      this.router.navigate(['/Productos']);
      this.spinner.hide()
    });
  }

}
