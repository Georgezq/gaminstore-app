import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../conexion';
import { Observable } from 'rxjs';
import { Reviews } from 'src/app/interfaces/reviewsIn';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  private api = URL_API;

  reviews$: Observable<Reviews[]>;

  getAllReviews(): Observable<any>{
    return this.http.get(`${URL_API}reviews`);
   }

  //Contar las reviews por juegos
  countReviewsByGame(gameId: string): Observable<any> {
    return this.http.get(`${URL_API}reviews/countG/${gameId}`);
  }

  countReviewsByUser(userId: string): Observable<any> {
    return this.http.get(`${URL_API}reviews/countU/${userId}`);
  }

  //Obtener las reviews por usuarios y juegos

  getReviewsByIdGame(id: string): Observable<any>{
   return this.http.get(`${URL_API}reviews/game/${id}`);
  }

  getReviewsByIdUser(id: string): Observable<any>{
    return this.http.get(`${URL_API}reviews/user/${id}`)
  }

  getReviewsByUserforGame(id: string): Observable<any>{
    return this.http.get(`${URL_API}reviews/userG/${id}`)
  }

}
