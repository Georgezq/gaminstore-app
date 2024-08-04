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

@NgModule({
  declarations: [ToolbarHeaderComponent, PortadaComponent, JuegosComponent, CategoriasComponent, NoticiaComponent],
  exports: [ToolbarHeaderComponent, PortadaComponent, JuegosComponent, CategoriasComponent, NoticiaComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TruncateJuegosPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ComponentesModule { }
