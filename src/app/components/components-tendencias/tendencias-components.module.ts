import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JuegosallComponent } from './juegosall/juegosall.component';

@NgModule({
  declarations: [ JuegosallComponent,
  ],
  exports: [ JuegosallComponent,
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
export class TendenciasComponents { }
