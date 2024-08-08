import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonAvatar } from '@ionic/angular/standalone';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { ReviewsService } from 'src/app/services/mongo/reviews/reviews.service';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';
import { RouterLink } from '@angular/router';
import { ComponentesModule } from 'src/app/components/components.module';
import { DefaultProfileImageDirective } from 'src/app/directives/default-profile-image.directive';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.page.html',
  styleUrls: ['./opiniones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink,
    IonCard, IonCardContent, IonCardHeader, IonAvatar, TruncateJuegosPipe, ComponentesModule,
    DefaultProfileImageDirective
  ]
})
export class OpinionesPage implements OnInit {

  reviews$ = inject(ReviewsService);
  usuarios$ = inject(AuthService);
  juegos$ = inject(GamesService);

  verPreview: boolean = true;
  reviews: any[] = [];
  juegos: any;
  userLoggedId: any;
  fecha:any;

  constructor() { }

  getReviews(): void {
    this.reviews$.getAllReviews().subscribe(
      data => {
        this.reviews = data;
        this.reviews.forEach(res => {
          this.juegos$.obtenerJuegoPorId(res.id_juego).subscribe(
            (juegoData) => {
              res.imagen = juegoData.imagen;
              const fechaDate = new Date(res.fecha);
              const opciones: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              };
             this.fecha = fechaDate.toLocaleDateString('es-ES', opciones);
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
