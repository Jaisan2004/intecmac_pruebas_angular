import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;
  private myApiUrl3: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cargo/';
    this.myApiUrl2 = 'traer/';
    this.myApiUrl3 = 'traerByArea/';
   }

   getCargo(id:any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiUrl2}${id}`);
   }

   getCargoByArea(id:any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiUrl3}${id}`);
   }

}
