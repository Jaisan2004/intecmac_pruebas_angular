import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DocumentoEstudioCreditosService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cred_apis/cred_estu_documento/';
    this.myApiUrl2 = 'api/cred_apis/cred_estu_documentos/';
  }

  getCredDocsEstu(id:any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${id}`);
  }

  getCredDocEstu(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  postCredDocEstu(body: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body)
  }

  updateCredDocEstu(id:any,body: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, body)
  }

  deleteCredDocEstu(id:any):Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
}
