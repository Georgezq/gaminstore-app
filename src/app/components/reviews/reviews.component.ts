import { Component, inject, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { ReviewsService } from 'src/app/services/mongo/reviews/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent  implements OnInit {

  reviews$ = inject(ReviewsService);
  usuarios$ = inject(AuthService);
  juegos$ = inject(GamesService);

  verPreview: boolean = true;
  reviews: any[] = [];
  juegos: any;
  userLoggedId: any;

  constructor() { }

  getReviews(): void {
    this.reviews$.getAllReviews().subscribe(
      data => {
        this.reviews = data;
        this.reviews.forEach(res => {
          this.juegos$.obtenerJuegoPorId(res.id_juego).subscribe(
            (juegoData) => {
              res.imagen = juegoData.imagen;
            }
          )
        })
      },
      error => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  ngOnInit() {
    this.getReviews();
  }

}
