import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/accesos/rutas/';
    this.myApiUrl2 = 'api/accesos/ruta/';

  }

  getRutasByComponente(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getRuta(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${id}`);
  }

  postRuta(body:any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
  }

  updateRuta(id:any, body:any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, body);
  }

  deleteRuta(id:any): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

}
