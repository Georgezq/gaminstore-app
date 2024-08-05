import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { Title } from '@angular/platform-browser';
import { ToolbarHeaderComponent } from 'src/app/components/toolbar-header/toolbar-header.component';
import { ComponentesModule } from 'src/app/components/components.module';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';

@Component({
  selector: 'app-mostrar-juego',
  templateUrl: './mostrar-juego.page.html',
  styleUrls: ['./mostrar-juego.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ComponentesModule,
    TruncateJuegosPipe
  ]
})
export class MostrarJuegoPage implements OnInit {

  juegoId: string;
  userId: string;
  inWishlist: boolean;
  gameName: any;

  juego$: Observable<Juegos | null> = null;

  //wishlist$ = inject(DeseadosService);
  auth$ = inject(AuthService);
  title$ = inject(Title);
  route = inject(ActivatedRoute);
  routeN = inject(Router);
  juegosService = inject(GamesService);
  //carrito$ = inject(CarritoService);

  juego: any;
  informacion: any;
  readMore = false;
  read: string = 'Leer más...';

  seeMore(){
    if(this.readMore == false ){
      this.readMore = true;
      this.read = 'Leer menos...';
    } else {
      this.readMore = false;
    }
  }

  constructor() { }

  // getIdUser(){
  //   const storedData = localStorage.getItem('whentheuserislogged');

  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     this.userId = parsedData.responses.id;
  //     this.auth$.loginSendData(this.userId).subscribe((res) =>{

  //     })
  //   }
  // }

  getIdGame(){
    this.juegoId = this.route.snapshot.paramMap.get('id');

    this.juegosService.obtenerJuegoPorId(this.juegoId).subscribe((response) => {
      this.juego = response;
      this.gameName = response.nombre;
      this.title$.setTitle(`Comprar ${this.gameName}`)

    });

    this.juegosService.obtenerInformacionPorJuegoId(this.juegoId).subscribe((response) => {
      this.informacion = response;
    });
  }

  ngOnInit() {
    this.getIdGame();
   // this.getIdUser();
  }

}
