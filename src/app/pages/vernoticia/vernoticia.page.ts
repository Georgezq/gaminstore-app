import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticias } from 'src/app/interfaces/noticiasIn';
import { NoticiasService } from 'src/app/services/dynamodb/noticias/noticias.service';
import { ComponentesModule } from 'src/app/components/components.module';
import { ComentariosMComponents } from "../../components/components-comentarios/comentarios-components.module";

@Component({
  selector: 'app-vernoticia',
  templateUrl: './vernoticia.page.html',
  styleUrls: ['./vernoticia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ComponentesModule, ComentariosMComponents]
})
export class VernoticiaPage implements OnInit {

  noticias$ = inject(NoticiasService);
  routes$ = inject(ActivatedRoute);
  router$ = inject(Router)

  noticias: Noticias[] = [];
  noticiaId: any;
  noticiaTitulo: string;

  getNoticiasById(){
    this.routes$.paramMap.subscribe(params => {
      this.noticiaTitulo = params.get('titulo');

      this.routes$.queryParams.subscribe(queryParams => {
        this.noticiaId = queryParams['noticias'];
      });


    this.noticias$.getNoticiasById(this.noticiaId).subscribe(
      (noticia:any) => {
        if(noticia.success){
          this.noticias = [noticia.data];
        }
    });
  });
}


  ngOnInit(): void {
    this.getNoticiasById();
  }

}
