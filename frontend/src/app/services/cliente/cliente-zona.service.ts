import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteZonaService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cliente_apis/cliente_zonas/';
    this.myApiUrl2 = 'api/cliente_apis/cliente_zona/';
   }

   getClienteZonasByCiudad(c_c_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${c_c_id}`);
   }

   getClienteZona(cz_id:any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${cz_id}`);
   }

   postClienteZona(body:any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,body);
   }

   updateClienteZona(cz_id:any, body:any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${cz_id}`, body);
   }
}
