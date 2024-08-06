import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { GamesService } from 'src/app/services/firebase/games/games.service';
import { CarritoService } from 'src/app/services/mongo/carrito/carrito.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss'],
})
export class ListaPedidosComponent  implements OnInit {

  carrito$ = inject(CarritoService);
  route$ = inject(ActivatedRoute);
  juegos$ = inject(GamesService);

  userId: any;

  carritotList: any;
  carritoGames: any[] = [];
  carritoGameIds: any[] = [];
  estadLista: any[] = [];
  estadoCarrito: any[] = [];


  ngOnInit(): void {
    this.getUsers();
    this.getGamesComprados();
  }

  trackByGameId(index: number, game: Juegos): number {
    return game.id;
  }

  getUsers() {
    const storedData = localStorage.getItem('whentheuserislogged');
    const parsedData = JSON.parse(storedData);
    const id = parsedData.responses.id;
    this.userId = id;
  }

  getGamesComprados(): void {
    try {
      this.carrito$.obtenerCompradosById(this.userId).subscribe(
        (response) => {
          this.carritoGameIds = response; // response debería ser un arreglo de IDs de juegos
          // Reiniciar la lista y el precio total
          this.carritotList = [];
          // Iterar sobre cada ID de juego en el carrito
          this.carritoGameIds.forEach((id) => {
            this.juegos$.obtenerJuegoPorId(id).subscribe(
              (juego) => {
                this.carritotList.push(juego); // Agregar el juego a la lista
              },
              (error) => {
                throw(error);
              }
            );
          });
        },
        (error) => {
          this.carritotList = []; // Reiniciar la lista en caso de error
          throw(error);
        }
      );
    } catch (error) {
      throw(error);
    }

  }


}
