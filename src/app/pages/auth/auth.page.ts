import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonInput, IonIcon,
  IonButton, IonInputPasswordToggle,
  AlertController, IonTabButton } from '@ionic/angular/standalone';
 import { eye, lockClosed, mail, logoGoogle } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    CommonModule, FormsModule, IonList, IonInput, IonIcon, IonInputPasswordToggle, ReactiveFormsModule],
})
export class AuthPage  {

  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  formReg: FormGroup;
  toggleF: boolean = true;

  constructor(private alertController: AlertController) {

    addIcons({ eye, lockClosed, mail, logoGoogle });

    this.formReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   }


   signInWithEmailAndPassword(): void {
     this.auth.login(this.formReg.value)
     .then(async () => {
      const storedData = localStorage.getItem('whentheuserislogged');
      if(storedData != null){
       this.goodSession();
      } else{
       this.badSession();
      }})
      .catch( () => {

      });
  }

  registerWithEmailAndPassword(): void {
    this.auth.register(this.formReg.value)
    .then(async (response) => {
      if(response !== null){
        this.goodRegister();
        this.toggleF = true;
      }
    })
    .catch(() => {

    });
  }

  loginGoogle(): void {
    this.auth.loginWithGoogle()
      .then(async (response) => {
        if(response !== null){
          this.goodSession();
        }
      })
      .catch(error => console.log(error))
  }


  toggleForm(){
    if(this.toggleF == true){
      this.toggleF = false;
    } else{
      this.toggleF = true;
    }
  }

  async badSession() {
    const alert = await this.alertController.create({
      header: 'Inicio de sesión incorrecto',
      message: 'Revise correctamente los campos',
      buttons: [
        {
          text: 'OK',
        },
      ],
    });

    await alert.present();
  }

  async badRegister() {
    const alert = await this.alertController.create({
      header: 'Registro incorrecto',
      message: 'Revise correctamente los campos',
      buttons: [
        {
          text: 'OK',
        },
      ],
    });

    await alert.present();
  }

  async goodSession() {
    const alert = await this.alertController.create({
      header: 'Inicio de sesión exitoso!',
      message: 'Serás redirigido a la página principal',
      buttons: [
        {
          text: 'OK',
          handler: () => this.router.navigate(['/home']),
        },
      ],
    });

    await alert.present();
  }

  async goodRegister() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso!',
      message: 'Inicia sesión con el usuario creado',
      buttons: [
        {
          text: 'OK',
          handler: () =>{
            this.formReg.reset();
          }
        },
      ],
    });

    await alert.present();
  }

}
