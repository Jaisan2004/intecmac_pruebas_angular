import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {

  private myAppUrl: string;
  private myApiUrl: string;
  private myApiCliente: string;
  private myApiProducto: string;
  private myApiPqrsCausa: string;
  private myApiCargos: string;
  private myApiPqrsTipo: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/seleccione/';
    this.myApiCliente = 'clientes/';
    this.myApiProducto = 'productos/';
    this.myApiPqrsCausa = 'pqrsCausa/';
    this.myApiCargos = 'cargos/';
    this.myApiPqrsTipo = 'pqrsTipologia/';

   }

   getClienteOpcion(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiCliente}`);
   }

   getInfoCliente(id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiCliente}${id}`)
   }

   getProductosOpcion(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiProducto}`);
   }

   getPqrsCausaOpcion(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiPqrsCausa}`);
   }

   getCargosOpcion(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiCargos}`);
   }

   getPqrsTipoOpcion(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiPqrsTipo}`);
   }

}
