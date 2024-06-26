import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/accesos/roles/';
   }

   getRoles():Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getRol(id:any):Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }

   postRoles(body: any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
   }

   updateRoles(id:any,body: any):Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, body);
   }
}
