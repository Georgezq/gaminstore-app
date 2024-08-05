import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewsService } from 'src/app/services/mongo/reviews/reviews.service';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';

@Component({
  selector: 'app-see-reviews',
  templateUrl: './see-reviews.component.html',
  styleUrls: ['./see-reviews.component.scss'],
})
export class SeeReviewsComponent  implements OnInit {

  @Input() juegoId: string;
  reviewCount: number;
  reviews: any[] = [];
  cantidadReviews: string;
  fecha: string;
  mensajeNo: any;
  readMore = false;


  display: boolean = false;

  selected: 'like' | 'dislike' | null = null;

  userPerfil: string;
  userId: any;
  userLoggedId: any;


  reviews$ = inject(ReviewsService);
  usuarios$ = inject(AuthService);
  routes$ = inject(Router);

  constructor() { }

  seeMore(){
    if(this.readMore == false ){
      this.readMore = true;
    } else {
      this.readMore = false;
    }
  }

  getReviewCount(): void {
    this.reviews$.countReviewsByGame(this.juegoId).subscribe(
      (response) => {
        this.reviewCount = response.reviewCount;
      },
      (error) => {
        console.error('Error al obtener el número de reviews:', error);
      }
    );
  }

  getReviews(): void {
    try {
      this.reviews$.getReviewsByIdGame(this.juegoId).subscribe(
        (response) => {

          if (response && response.length > 0) {
            this.reviews = response;
            // Procesar las reviews
            this.reviews.forEach(review => {
              this.userId = review.id_usuario;
              const fechaDate = new Date(review.fecha);
              const opciones: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              };
              review.fecha = fechaDate.toLocaleDateString('es-ES', opciones);
            });

            this.reviews.forEach(review => {
              this.usuarios$.loginSendData(review.id_usuario).subscribe(userInfo => {
                review.userInfo = userInfo;
                this.userPerfil = userInfo.imagenperfil;
              });
            });
          } else {
            console.log('No reviews found for this game.');
            this.reviews = [];
          }
        },
        () => {
          this.mensajeNo = 'Todavia no hay ninguna review para este juego!'
        }
      );

    } catch (error) {
      console.error('Error al intentar obtener las reviews:', error);
    }
  }

  ngOnInit() {
    this.getReviews();
    this.getReviewCount();
  }

}
