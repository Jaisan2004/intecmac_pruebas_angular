import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DocumentoCreditosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cred_apis/cred_documento/';
  }

  getCredDocumentos(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCredDocumento(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
