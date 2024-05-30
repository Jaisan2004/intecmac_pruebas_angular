import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  msjError(e: HttpErrorResponse){
    if(e.error.msg){
      this.toastr.error(e.error.msg, 'Error');
      this.spinner.hide()
    }else{
      this.toastr.error('Ha ocurrido un error, Comuniquese con el administrador', 'Error')
      this.spinner.hide()
    }
  }
}
