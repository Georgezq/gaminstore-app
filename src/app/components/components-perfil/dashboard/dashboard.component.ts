import { Component, inject, OnInit } from '@angular/core';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { ReviewsService } from 'src/app/services/mongo/reviews/reviews.service';
import { WishlistService } from 'src/app/services/mongo/wishlist/wishlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  auth$ = inject(ReviewsService);
  wishlist$ = inject(WishlistService);
  juegos$ = inject(GamesService);
  //comprados$ = inject(CarritoService);


  reviewsList: any[] = [];
  reviewedGameIds: string[] = [];
  reviewedGames: any[] = [];

  wishlistList: any[] = [];
  wishlistGames: any[] = [];
  wishlistGameIds: any[] = [];
  lastAddedGame: Juegos | null = null;

  amigos: string;
  reviews: any;
  deseados: string;
  juegos: string;
  idUser: any;
  comprados: any;

  ngOnInit(): void {
    const storedData = localStorage.getItem('whentheuserislogged');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.idUser = parsedData.responses.id;

    }

     this.getReviewCount();
     this.getWishlistCount();
     this.getGamesInWishList();
     this.getWishlistForTheDate();
    // this.getBuysCount();
  }


  getReviewCount(): void {
    this.auth$.countReviewsByUser(this.idUser).subscribe(
      (response) => {
        this.reviews = response.reviewCount;
      },
      (error) => {
        console.error('Error al obtener el número de reviews:', error);
      }
    );
  }

  // getBuysCount(): void {
  //   this.comprados$.obtenerCountComprados(this.idUser).subscribe(
  //     (response) => {
  //       this.comprados = response.carritoCount;
  //     },
  //     (error) => {
  //       console.error('Error al obtener el número de reviews:', error);
  //     }
  //   );
  // }

  getWishlistCount(): void {

    this.wishlist$.wishlistCount(this.idUser).subscribe(
      (response:any) => {
        this.deseados = response.wishlistCount;
      },
      (error) => {
        console.error('Error al obtener el número de reviews:', error);
      }
    );
  }

  getGamesInWishList(): void {
    this.wishlist$.getWishListByUser(this.idUser).subscribe(
      (response: any) => {
        this.wishlistGameIds = response;

        this.wishlistGameIds.forEach(id => {
          this.juegos$.obtenerJuegoPorId(id).subscribe(
            (juego) => {
              this.wishlistGames.push(juego);
            },
            (error) => {
              console.error('Error al obtener la información del juego:', error);
            }
          );
        });
      },
      (error) => {
        throw(error)
      }
    );
  }

  getWishlistForTheDate(): void {
    this.wishlist$.getWishlistByUserToDate(this.idUser).subscribe(
      (response) => {
        // Assuming response is an array of { id: string, created_at: Date }
        const sortedWishlist = response.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const lastAddedGameId = sortedWishlist[0]?.id_juego;

        if (lastAddedGameId) {
          this.juegos$.obtenerJuegoPorId(lastAddedGameId).subscribe(
            (juego) => {
              this.lastAddedGame = juego;
            },
            (error) => {
              console.error('Error al obtener la información del juego:', error);
            }
          );
        } else {
          console.log('No hay juegos en la lista de deseos.');
        }
      },
      (error) => {
       throw(error)
      }
    );
  }

}
