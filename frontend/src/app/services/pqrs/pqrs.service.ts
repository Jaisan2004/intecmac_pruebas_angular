import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pqrs/';
   }

   getListPqrs(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getPqrs(id:any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}obtener/${id}`);
   }

   getLastPqrs(): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}ultimo_pqrs/`);
   }

   postPqrs(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
   }

   postCorreoCreacionPqrs(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}api/pqrs_apis/pqrs_creada/`, body);
   }

   updatePqrs(id: any, body: any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}actualizar/${id}`, body);
   }

   updatePqrsImg(id: any, body: any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}agregarImg/${id}`, body);
   }

   PqrsImg(body: FormData): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}guardarImg/`, body);
   }
}
