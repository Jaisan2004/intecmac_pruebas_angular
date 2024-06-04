import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/accesos/modulos/';
    this.myApiUrl2 = 'api/accesos/componentes/';
   }

   getModulos():Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getComponentes(id:any):Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${id}`)
   }
}
