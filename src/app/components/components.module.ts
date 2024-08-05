import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component';
import { PortadaComponent } from './portada/portada.component';
import { JuegosComponent } from './juegos/juegos.component';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TruncateJuegosPipe } from '../pipes/truncate-juegos.pipe';
import { CategoriasComponent } from './categorias/categorias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ToolbarHeaderComponent, PortadaComponent, JuegosComponent, CategoriasComponent, NoticiaComponent,
    ReviewsComponent, FooterComponent
  ],
  exports: [ToolbarHeaderComponent, PortadaComponent, JuegosComponent, CategoriasComponent, NoticiaComponent,
    ReviewsComponent, FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TruncateJuegosPipe,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ComponentesModule { }
