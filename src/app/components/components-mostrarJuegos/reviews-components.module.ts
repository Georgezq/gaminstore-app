import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { ReviewsBygameComponent } from './reviews-bygame/reviews-bygame.component';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';
import { SeeReviewsComponent } from './see-reviews/see-reviews.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DefaultProfileImageDirective } from 'src/app/directives/default-profile-image.directive';

@NgModule({
  declarations: [ ReviewsBygameComponent, SeeReviewsComponent
  ],
  exports: [ ReviewsBygameComponent, SeeReviewsComponent
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
export class ReviewsMComponents { }
