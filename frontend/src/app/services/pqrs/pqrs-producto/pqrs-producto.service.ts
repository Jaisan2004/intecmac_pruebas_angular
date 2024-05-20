import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PqrsProductoService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pqrs_apis/pqrs_producto/';
    this.myApiUrl2 = 'api/pqrs_apis/pqrs_productos/';
   }

   getProductosPqrs(pqrs_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl2}${pqrs_id}`);
   }

   getProductoPqrs(pp_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${pp_id}`);
   }

   postProductoPqrs(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
   }

   updateProductoPqrs(prod_id: any, body: any){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${prod_id}`, body);
   }
}
