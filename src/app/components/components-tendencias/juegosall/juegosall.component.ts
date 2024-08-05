import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Juegos } from 'src/app/interfaces/juegosIn';
import { GamesService } from 'src/app/services/firebase/games/games.service';

@Component({
  selector: 'app-juegosall',
  templateUrl: './juegosall.component.html',
  styleUrls: ['./juegosall.component.scss'],
})
export class JuegosallComponent implements OnInit {

  verPreview: boolean = true;

  private _gamesService = inject(GamesService);
  private fb = inject(FormBuilder);

  filteredGames$: Observable<Juegos[]>;
  filterForm: FormGroup;
  games$: Observable<Juegos[]>;

  constructor(){
    this.filterForm = this.fb.group({
      minPrice: [''],
      maxPrice: [''],
      nombreJuego: ['']
    });
  }

  ngOnInit(): void {

    this.games$ = this._gamesService.obtenerJuegos();


    this.filteredGames$ = combineLatest([
      this.games$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
    ]).pipe(
      map(([games, filters]) => this.applyFilters(games, filters))
    );
  }

  private applyFilters(games: Juegos[], filters: any): Juegos[] {
    return games.filter(game => this.filterGame(game, filters));
  }

  private filterGame(game: Juegos, filters: any): boolean {
    const matchesPrice = (!filters.minPrice || game.precio >= filters.minPrice) &&
                         (!filters.maxPrice || game.precio <= filters.maxPrice);
    const matchesName = !filters.nombreJuego || game.nombre.toLowerCase().includes(filters.nombreJuego.toLowerCase());

    return matchesPrice && matchesName;
  }

  trackByGameId(index: number, game: Juegos): number {
    return game.id;
  }



}
