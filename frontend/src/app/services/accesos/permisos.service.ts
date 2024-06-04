import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/accesos/permisos/';
    this.myApiUrl2 = 'api/accesos/permiso/';
  }

  getPermisosByRol(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getPermiso(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${id}`);
  }

  postPermiso(body: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body)
  }

  updatePermiso(id:any,body: any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, body)
  }

  deletePermiso(id:any){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
}
