import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanAccionService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrlTable: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pqrs_apis/plan_accion/';
    this.myApiUrlTable = 'api/pqrs_apis/planes_accion/';
   }

   getListPqrsPlan(pqrs_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrlTable}${pqrs_id}`);
   }

   postPlanPqrs(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
   }

   getPqrsPlan(ppa_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${ppa_id}`);
   }

   putPlanPqrs(ppa_id: any,body: any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${ppa_id}`, body);
   }
}
