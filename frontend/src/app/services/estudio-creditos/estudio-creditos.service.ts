import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstudioCreditosService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;
  private myApiUrl3: string;
  private myApiUrl4: string;
  private myApiUrl5: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cred_estudio/';
    this.myApiUrl2 = 'api/cred_apis/ultimo_estudio';
    this.myApiUrl3 = 'api/cred_apis/cred_estudio_creado_correo';
    this.myApiUrl4 = 'api/cred_apis/cred_estu_correo_etapa';
    this.myApiUrl5 = 'api/cred_apis/cred_estu_correo_etapa_creador';
  }

  getCredEstudios(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCredEstudio(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getLastCredEstudio(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}`);
  }

  postCredEstudio(body: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body)
  }

  updateCredEstudio(id:any,body: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, body)
  }

  correoCreaCredEstu(body:any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl3}`,body)
  }

  correoEtapaEstuCred(body:any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl4}`,body)
  }

  correoEtapaEstuCredCreador(body:any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl5}`,body)
  }

  archivoGuardar(body: FormData):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}agregarPdf`, body)
  }
}
