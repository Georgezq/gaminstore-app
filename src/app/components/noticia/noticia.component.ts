import { Component, inject, OnInit } from '@angular/core';
import { Noticias } from 'src/app/interfaces/noticiasIn';
import { NoticiasService } from 'src/app/services/dynamodb/noticias/noticias.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent  implements OnInit {

  noticias$ = inject(NoticiasService);
  allNews: Noticias[] = [];

  constructor() { }

  obtenerNoticias(){
    this.noticias$.getNoticias().subscribe(
      (res) => {
        if (res.success) {
          this.allNews = res.data;
        } else {
          console.error('Error al obtener las noticias');
        }
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }

  ngOnInit() {
    this.obtenerNoticias()
  }

}
