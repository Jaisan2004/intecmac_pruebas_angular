import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteCiudadService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cliente_apis/cliente_ciudad/';
   }

   getClienteCiudad(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
   }
}
