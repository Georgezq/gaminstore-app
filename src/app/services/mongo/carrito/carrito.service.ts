import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API, API_KEY_STRIPE, URL_API } from '../../conexion';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }

  onProceedToPay(juegos: Juegos[], userId: string) {
    return this.http.post(`${API}/checkout`, { items: juegos, userId: userId }).subscribe({
      next: async (res: any) => {
        const stripe = await loadStripe(API_KEY_STRIPE);
        stripe?.redirectToCheckout({ sessionId: res.id });
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  agregarAlCarrito(idUsuario: string, idJuego: string, estado: boolean): Observable<any> {
    return this.http.post(`${URL_API}carrito`, { id_usuario: idUsuario, id_juego: idJuego, estado: estado });
  }

  eliminarDelCarrito(idUsuario: string, idJuego: string): Observable<any> {
    return this.http.delete(`${URL_API}remove/${idUsuario}/${idJuego}`);
  }

  obtenerCarrito(userId: string): Observable<any> {
    return this.http.get(`${URL_API}carrito/${userId}`)
  }

  obtenerCompradosById(userId: string): Observable<any> {
    return this.http.get(`${URL_API}comprados/${userId}`)
  }

  obtenerCarritoEstado(userId: string): Observable<any> {
    return this.http.get(`${URL_API}carrito_estado/${userId}`)
  }

  obtenerCountByUser(userId: string): Observable<any> {
    return this.http.get(`${URL_API}countU/${userId}`);
  }

  obtenerCountComprados(userId: string): Observable<any> {
    return this.http.get(`${URL_API}countG/${userId}`);
  }

}
