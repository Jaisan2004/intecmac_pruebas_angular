import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/producto/';
  }

  getProductos(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getProducto(id:any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  postProducto(body:any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body);
  }

  updateProducto(id:any, body:any): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, body);
  }

}
