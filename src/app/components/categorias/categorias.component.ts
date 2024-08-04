import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/firebase/categorias/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent {

  constructor() { }

  private categoria$ = inject(CategoriaService);
  categorias = this.categoria$.obtenerCategorias();

}
