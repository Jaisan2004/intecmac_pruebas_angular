import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoService } from '../../../services/producto/producto.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrl: './modificar-producto.component.css'
})
export class ModificarProductoComponent {

  get pro_id() {
    return this.formProducto.get('pro_id') as FormControl
  }

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
    'pro_id': new FormControl({value:'', disable: true}),
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

  dataProducto: any;
  data: any;
  pqrs_id: any;

  constructor(private _productosService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.pro_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));

    this.traerProducto();
  }

  modificarProducto() {
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

    this._productosService.updateProducto(this.pro_id.value,body).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Producto: "${this.prod_descripcion.value}" se registro exitosamente`, `Registro Producto`);
      this.router.navigate(['/Productos']);
      this.spinner.hide();
    });
  }

  traerProducto(){
    this.spinner.show();

    this._productosService.getProducto(this.pro_id.value).subscribe((data: any)=>{
      this.dataProducto = data;
      this.prod_descripcion.setValue(this.dataProducto.prod_descripcion);
      this.prod_ref.setValue(this.dataProducto.prod_ref);
      this.prod_presentacion.setValue(this.dataProducto.prod_presentacion);
      this.prod_und_vta_x_carton.setValue(this.dataProducto.prod_und_vta_x_carton);
      this.prod_iva.setValue(this.dataProducto.prod_iva);
      this.spinner.hide();
    });
  }
}
