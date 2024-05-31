import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error/error.service';
import { Injectable } from '@angular/core';



@Injectable()
export class añadirTokenInterceptor implements HttpInterceptor {
  

  constructor(private router: Router, 
    private _errorService: ErrorService, 
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 || error.status == 403) {
          this._errorService.msjError(error);
          this.router.navigate(['/Login']);
        } else {
          this._errorService.msjError(error);
        }
        return throwError(()=>new Error());
      })
    );
  }
}
