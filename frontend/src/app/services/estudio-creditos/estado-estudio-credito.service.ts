import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoEstudioCreditoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cred_apis/cred_estado_estudio/';
  }

  getEstadosByEstudio(id:any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  postEstadoEstudio(body: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
  }

  updateEstadoEstudio(id: any, body: any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`,body);
  }
}
