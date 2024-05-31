import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../../services/accesos/usuarios.service';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '../../../services/error/error.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  get username(){
    return this.formLogin.get('username') as FormControl;
  }

  get password(){
    return this.formLogin.get('password') as FormControl;
  }

  formLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('')
  });

  constructor(private toastr: ToastrService,
    private _usuarioService: UsuariosService,
    private router: Router,
    private _errorService: ErrorService,
    private spinner: NgxSpinnerService
  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  login(){
    this.spinner.show();
    //Validacion de datos de usuario
    if(!this.username.value|| !this.password.value){
      this.spinner.hide();
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    const body={
      username: this.username.value,
      password: this.password.value
    }

    this._usuarioService.login(body).subscribe({
      next: (data: any)=>{
        localStorage.setItem('token', data.token);
        this.spinner.hide()
        this.router.navigate(['/Pqrs']);
        console.log(data);
        
      }
    })
  }

  
}
