import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Noticias } from 'src/app/interfaces/noticiasIn';
import { NoticiasService } from 'src/app/services/dynamodb/noticias/noticias.service';
import { ComponentesModule } from 'src/app/components/components.module';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ComponentesModule,
    TruncateJuegosPipe
  ]
})
export class NoticiasPage implements OnInit {

  noticias$ = inject(NoticiasService);
  router = inject(Router);

  noticias: Noticias[] = [];
  allNews: Noticias[] = [];

  ngOnInit() {
    this.obtenerNoticiasPorFecha();
    this.obtenerNoticias();
  }

  formatTitulo(titulo: string): string {
    return titulo.replace(/ /g, '-');
  }

  goToNoticia(titulo: string, id: string): void {
    this.router.navigate(['/vernoticia', this.formatTitulo(titulo)], { queryParams: { noticias: id } });
  }

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

  obtenerNoticiasPorFecha(){
    this.noticias$.getNoticias().subscribe(
      (res) => {
        if (res.success) {
          // Ordenar las noticias por fecha de creación en orden descendente
          this.noticias = res.data.sort((a: any, b: any) => {
            return new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime();
          }).slice(0, 2); // Limitar a las primeras 2 noticias
        } else {
          console.error('Error al obtener las noticias');
        }
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }


}
