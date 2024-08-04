import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { GamesService } from 'src/app/services/firebase/games/games.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss'],
})
export class JuegosComponent {

  @Input() numElementos: number; // Acepta el número de elementos desde el componente padre
  private _gamesService = inject(GamesService);

  games$ = this._gamesService.obtenerJuegos();

  constructor() { }





}
