import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { ReviewsService } from 'src/app/services/mongo/reviews/reviews.service';
import { IonModal } from '@ionic/angular/standalone';
import { Reviews } from 'src/app/interfaces/reviewsIn';

@Component({
  selector: 'app-reviews-bygame',
  templateUrl: './reviews-bygame.component.html',
  styleUrls: ['./reviews-bygame.component.scss'],
})
export class ReviewsBygameComponent implements OnInit {
  @Input() juegoId: string;
  reviewForm: FormGroup;
  reviewCount: number;
  reviews: any[] = [];
  @ViewChild(IonModal) modal: IonModal;

  display: boolean = false;

  selected: 'like' | 'dislike' | null = null;

  userLoggedId: any;

  reviews$ = inject(ReviewsService);
  usuarios$ = inject(AuthService);
  routes$ = inject(Router);
  fb = inject(FormBuilder);

  visible: boolean = false;

  constructor() {
    const loggedIndicator = localStorage.getItem('whentheuserislogged');

    if (loggedIndicator) {
      const parsedData = JSON.parse(loggedIndicator);
      const id = parsedData.responses.id;
      this.usuarios$.loginSendData(id).subscribe((res) => {
        this.userLoggedId = id;
      });
    }
  }

  cancel() {
    this.modal.dismiss();
  }

  onSubmit() {
    const reviewData: Reviews = {
      id_usuario: this.userLoggedId,
      id_juego: this.juegoId,
      comentario: this.reviewForm.value.comentario,
      calificacion: this.selected === 'like',
      pros: this.reviewForm.value.pros.filter((pro) => pro !== ''),
      contras: this.reviewForm.value.contras.filter((contra) => contra !== ''),
      likes: 0,
      dislikes: 0,
    };

    this.reviews$.sendReviews(reviewData).subscribe(() => {
      this.reviewForm.reset();
      this.modal.dismiss();
    });
  }

  select(option: 'like' | 'dislike') {
    this.selected = option;
  }

  get pros() {
    return this.reviewForm.get('pros') as FormArray;
  }

  get contras() {
    return this.reviewForm.get('contras') as FormArray;
  }

  getReviewCount(): void {
    this.reviews$.countReviewsByGame(this.juegoId).subscribe(
      (response) => {
        this.reviewCount = response.reviewCount;
      },
      (error) => {
        console.error('Error al obtener el número de reviews:', error);
      }
    );
  }

  presentModal() {
    this.modal.present();
  }

  ngOnInit() {
    this.getReviewCount();

    this.reviewForm = this.fb.group({
      comentario: ['', Validators.requiredTrue],
      pros: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ]),
      contras: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ]),
    });
  }
}
