import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { ReviewsBygameComponent } from './reviews-bygame/reviews-bygame.component';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';

@NgModule({
  declarations: [ ReviewsBygameComponent,
  ],
  exports: [ ReviewsBygameComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TruncateJuegosPipe,
    RouterLink
  ],

})
export class ComponentesModule { }
