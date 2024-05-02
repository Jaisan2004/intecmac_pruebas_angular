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

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pqrs_apis/plan_accion/';
   }

   getListPqrsPlan(pqrs_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${pqrs_id}`);
   }

   postPlanPqrs(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
   }
}
