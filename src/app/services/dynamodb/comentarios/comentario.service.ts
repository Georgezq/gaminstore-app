import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentarios } from 'src/app/interfaces/comentariosIn';
import { API } from '../../conexion';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  private api = API;

  getCommentsByNewID() {
    return this.http.get<any>(`${this.api}comentario`);
  }

  sendComments(comentario: Comentarios){
    return this.http.post(`${this.api}comentario`, comentario);
  }

  getComentariosByNewsId(newsId: string): Observable<any> {
    return this.http.get(`${this.api}comentario/${newsId}`);
  }

}
