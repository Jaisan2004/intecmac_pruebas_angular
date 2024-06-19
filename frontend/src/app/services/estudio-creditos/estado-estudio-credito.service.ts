import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { id } from '@swimlane/ngx-datatable';

@Injectable({
  providedIn: 'root'
})
export class EstadoEstudioCreditoService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cred_apis/cred_estado_estudio/';
    this.myApiUrl2 = 'api/cred_apis/cred_estado_ultimo/';
  }

  getEstadosByEstudio(id:any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getLastEstadoByEstudio(id:any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${id}`)
  }

  postEstadoEstudio(body: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
  }

  updateEstadoEstudio(id: any, body: any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`,body);
  }
}
