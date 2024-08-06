import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { ReviewsService } from 'src/app/services/mongo/reviews/reviews.service';
import { WishlistService } from 'src/app/services/mongo/wishlist/wishlist.service';

@Component({
  selector: 'app-lista-deseados',
  templateUrl: './lista-deseados.component.html',
  styleUrls: ['./lista-deseados.component.scss'],
})
export class ListaDeseadosComponent  implements OnInit {

  userId: string;
  gameId: string;
  allGamesID: any;
  wishlist: string[] = []; // Cambio el tipo a string[]
  deseados: any;
  juegosDetails$: Observable<Juegos[]>; // Observable de array de Juegos
  loading = true; // Bandera para controlar el estado de carga
  verPreview: boolean = true;

  auth$ = inject(AuthService);
  wishlist$ = inject(WishlistService);
  juegos$ = inject(GamesService);
  reviews$ = inject(ReviewsService);



  wishlistList: any[] = [];
  wishlistGames: any[] = [];
  wishlistGameIds: any[] = [];

  ngOnInit(): void {
    this.getIdUser();
    this.getGamesInWishList();
    this.getWishlistCount();
  }

  getWishlistCount(): void {

    this.wishlist$.wishlistCount(this.userId).subscribe(
      (response:any) => {
        this.deseados = response.wishlistCount;
      },
      (error) => {
        console.error('Error al obtener el número de reviews:', error);
      }
    );
  }

  getIdUser(): void {
    const storedData = localStorage.getItem('whentheuserislogged');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.userId = parsedData.responses.id;
    }
  }

  getGamesInWishList(): void {
    this.wishlist$.getWishListByUser(this.userId).subscribe(
      (response) => {
        this.wishlistGameIds = response;
        this.wishlistGameIds.forEach(id => {
          this.juegos$.obtenerJuegoPorId(id).subscribe(
            (juego) => {
              this.wishlistGames.push(juego);
            },
            (error) => {
              throw(error)
            }
          );
        });
      },
      () => {
      }
    );
  }

}
