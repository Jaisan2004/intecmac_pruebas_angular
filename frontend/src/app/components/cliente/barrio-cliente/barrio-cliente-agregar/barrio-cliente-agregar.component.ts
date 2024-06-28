import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClienteCiudadService } from '../../../../services/cliente/cliente-ciudad.service';
import { ClienteZonaService } from '../../../../services/cliente/cliente-zona.service';

@Component({
  selector: 'app-barrio-cliente-agregar',
  templateUrl: './barrio-cliente-agregar.component.html',
  styleUrl: './barrio-cliente-agregar.component.css'
})
export class BarrioClienteAgregarComponent {
  get cz_id() {
    return this.formBarrio.get('cz_id') as FormControl
  }

  get cz_nombre() {
    return this.formBarrio.get('cz_nombre') as FormControl
  }

  get c_c_id() {
    return this.formBarrio.get('c_c_id') as FormControl
  }
  formBarrio = new FormGroup({
    'cz_id': new FormControl({ value: '', disabled: true }),
    'cz_nombre': new FormControl('', [Validators.required, Validators.maxLength(200)]),
    'c_c_id': new FormControl({ value: '', disabled: true }),
  });

  public loading: boolean | any;
  public barrioCrear: boolean = false;
  public barrioModificar: boolean = false;

  public title: string = '';


  componente: boolean = false;


  constructor(private _clienteZonaService: ClienteZonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.agregarOrModificarCiudad();
  }

  agregarOrModificarCiudad() {
    const ruta = this.activatedRoute.snapshot.url[0].path;

    if (ruta == 'AgregarBarrios') {
      this.c_c_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
      this.title = 'Agregar';
      this.barrioCrear = true;
      this.barrioModificar = false;
    } else {
      this.cz_id.setValue(this.activatedRoute.snapshot.paramMap.get('id'));
      this.title = 'Modificar';
      this.barrioCrear = false;
      this.barrioModificar = true;
      this.traerZona(this.cz_id.value);
    }
  }

  AgregarZona() {
    this.spinner.show()
    this.loading = true;

    const body = {
      cz_nombre: this.cz_nombre.value,
      c_c_id:this.c_c_id.value
    }

    this._clienteZonaService.postClienteZona(body).subscribe((data) => {
      const mensaje = data.msg;
      this.loading = false;
      this.toastr.success(mensaje, `Registro Barrio`);
      this.router.navigate([`/Barrios/${this.c_c_id.value}`]);
      this.spinner.hide();
    },
      (error) => {
        this.loading = false;
        this.spinner.hide();
      })
  }

  modificarZona() {
    this.spinner.show();
    this.loading = true;

    const body = {
      cz_nombre: this.cz_nombre.value,
      c_c_id:this.c_c_id.value
    }
    this._clienteZonaService.updateClienteZona(this.cz_id.value, body).subscribe((data: any) => {
      const mensaje = data.msg;
      this.toastr.success(mensaje, 'Modificación Ciudad');
      this.router.navigate([`/Barrios/${this.c_c_id.value}`]);
      this.loading = false;
      this.spinner.hide();
    },
      (error) => {
        this.loading = false;
        this.spinner.hide();
      })
  }

  traerZona(id: any) {
    this.spinner.show();
    this._clienteZonaService.getClienteZona(id).subscribe((data: any) => {
      const dataBarrio = data;
      this.cz_nombre.setValue(dataBarrio.cz_nombre);
      this.c_c_id.setValue(dataBarrio.c_c_id);
      this.spinner.hide();
    })
  }
}
