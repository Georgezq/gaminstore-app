import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../conexion';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  private api = API;


  getNoticias() {
    return this.http.get<any>(`${this.api}noticia`);
  }

  getNoticiasById(id: string){
    return this.http.get(`${this.api}noticia/${id}`);
  }

}
