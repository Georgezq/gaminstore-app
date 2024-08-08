import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal, IonButtons, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { Title } from '@angular/platform-browser';
import { ComponentesModule } from 'src/app/components/components.module';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';
import { ReviewsMComponents } from 'src/app/components/components-mostrarJuegos/reviews-components.module';
import { WishlistService } from 'src/app/services/mongo/wishlist/wishlist.service';
import { CarritoService } from 'src/app/services/mongo/carrito/carrito.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-mostrar-juego',
  templateUrl: './mostrar-juego.page.html',
  styleUrls: ['./mostrar-juego.page.scss'],
  standalone: true,
  imports: [IonFooter, IonLabel, IonImg, IonAvatar, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ComponentesModule,
    TruncateJuegosPipe, ReviewsMComponents, IonButtons, IonList, IonItem, IonModal, RouterLink
  ]
})
export class MostrarJuegoPage implements OnInit {

  juegoId: string;
  userId: string;
  inWishlist: boolean;
  gameName: any;
  @ViewChild(IonModal) modal: IonModal;


  juego$: Observable<Juegos | null> = null;

  wishlist$ = inject(WishlistService);
  auth$ = inject(AuthService);
  title$ = inject(Title);
  route = inject(ActivatedRoute);
  juegos$ = inject(GamesService);
  routeN = inject(Router);
  juegosService = inject(GamesService);
  carrito$ = inject(CarritoService);

  juego: any;
  informacion: any;
  readMore = false;
  read: string = 'Leer más...';

  carritotList: any[] = [];
  carritoGames: any[] = [];
  carritoGameIds: any[] = [];
  estadLista: any[] = [];
  estadoCarrito: any[] = [];

  totalPrice: number = 0;
  noGames: boolean = false;


  seeMore(){
    if(this.readMore == false ){
      this.readMore = true;
      this.read = 'Leer menos...';
    } else {
      this.readMore = false;
    }
  }

  onProceedToPay() {
    this.carrito$.onProceedToPay(this.carritotList, this.userId);
    //this.cancel();
    //this.routeN.navigate(['/carrito'])
  }

  constructor() { }

  getIdUser(){
    const storedData = localStorage.getItem('whentheuserislogged');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.userId = parsedData.responses.id;
      this.auth$.loginSendData(this.userId).subscribe((res) =>{

      })
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  getCarritoState(): void {
    try {
      this.carrito$.obtenerCarritoEstado(this.userId).subscribe(
        (response) => {
          this.estadoCarrito = response;
          this.getGamesInMyCart(); // Llamar a getGamesInMyCart después de obtener el estado del carrito
        },
        (error) => {
          throw(error);
        }
      );
    } catch (error) {
      throw(error);

    }
  }

  getGamesInMyCart(): void {
    try {
      this.carrito$.obtenerCarrito(this.userId).subscribe(
        (response) => {
          this.carritoGameIds = response; // response debería ser un arreglo de IDs de juegos

          // Reiniciar la lista y el precio total
          this.carritotList = [];
          this.totalPrice = 0;

          // Iterar sobre cada ID de juego en el carrito
          this.carritoGameIds.forEach((id) => {
            this.juegos$.obtenerJuegoPorId(id).subscribe(
              (juego) => {
                this.carritotList.push(juego); // Agregar el juego a la lista
                this.totalPrice += juego.precio; // Sumar el precio del juego al total
              },
              (error) => {
                throw(error);
              }
            );
          });
        },
        (error) => {
          this.carritotList = []; // Reiniciar la lista en caso de error
          this.totalPrice = 0;
          throw(error);
        }
      );
    } catch (error) {
      throw(error);
    }
  }

  removeItem(idGame: string) {
    this.carrito$.eliminarDelCarrito(this.userId, idGame).subscribe(
      () => {
        // Refrescar la lista de juegos en el carrito
        this.getGamesInMyCart();
      },
      (error) => {
        console.error('Error al eliminar el juego del carrito:', error);
      }
    );
  }

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

  //Obtiene un booleano, segun el usuario logueado si tiene este juego marcado como fav

  checkIfInWishlist(): void {
    this.wishlist$.isGameInWishlist(this.userId, this.juegoId).subscribe(response => {
      this.inWishlist = response.inWishlist;
    });
  }

  //Funciones para los botones de añadir y quitar favoritos

  addToWishlist(): void {
      try {
        if(this.userId != undefined){
          this.wishlist$.addToWishlist(this.userId, this.juegoId).subscribe(response => {
            this.inWishlist = true; // Actualiza el estado

          });
        } else {
          this.routeN.navigate(['auth']);
        }
      } catch (error) {
        error => {
          console.error('Error al añadir el juego a la lista de deseos:', error);
        }
      }


  }
  removeFromWishlist(): void {
    this.wishlist$.removeFromWishlist(this.userId, this.juegoId).subscribe(response => {
    //  console.log('Juego eliminado de la lista de deseados:', response);
      this.inWishlist = false; // Actualiza el estado

    }, error => {
      console.error('Error al eliminar el juego de la lista de deseados:', error);
    });
  }

  //Para añadir al carrito
  addToCart(): void {
    try {
      if (this.userId !== undefined) {
        this.carrito$.agregarAlCarrito(this.userId, this.juegoId, true).subscribe(
          (response: any) => {
            this.getCarritoState();
            this.modal.present(); // Abrir el modal
            },
            (error: any) => {
                console.error('Error al añadir el juego al carrito:', error);
              }
            );
      } else {
        this.routeN.navigate(['auth']);
      }
    } catch (error) {
      console.error('Error al añadir el juego al carrito:', error);
    }
  }

  ngOnInit() {
    this.getIdGame();
    this.getIdUser();
    this.checkIfInWishlist();
    this.getCarritoState();
  }

}
