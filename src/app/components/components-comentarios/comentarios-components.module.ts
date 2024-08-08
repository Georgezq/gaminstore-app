import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { DefaultProfileImageDirective } from '../../directives/default-profile-image.directive';

@NgModule({
  declarations: [ ComentariosComponent,
  ],
  exports: [ ComentariosComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TruncateJuegosPipe,
    RouterLink,
    DefaultProfileImageDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class ComentariosMComponents { }
