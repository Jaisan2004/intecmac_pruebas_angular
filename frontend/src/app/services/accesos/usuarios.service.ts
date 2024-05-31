import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarios/';
   }

   login(body: any): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, body);
   }

   comprobacionPermisos(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}permisos`, body);
   }

   getUsuarios():Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getUsuario(id: any):Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }

   postUsuarios(body:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}nuevo`,body);
   }
}
