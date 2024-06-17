import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cliente/';
   }

   getClientes(): Observable<any>{
    
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`/*, {headers: headers}*/);
   }
   getCliente(cli_id: any): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${cli_id}`);
   }
   postCliente(body: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
   }
   updateCliente(cli_id:any, body: any){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${cli_id}`, body);
   }
}
