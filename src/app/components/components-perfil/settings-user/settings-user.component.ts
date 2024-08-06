import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuarioIn';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.scss'],
})
export class SettingsUserComponent  implements OnInit {

  userName: any;
  userId: any;
  discord: string;
  steam: string;
  youtube: string;


  auth$ = inject(AuthService);

  userForm: FormGroup;
  userUpdate: Usuario = {
    displayName: '',
    redesSociales: {
      discord: '',
      steam: '',
      youtube: ''
    }
  };

  constructor(private fb: FormBuilder,private alertController: AlertController){}


  ngOnInit(): void {

    this.inicializarFormulario();
    this.ObtenerValores();

  }

  private ObtenerValores(): void {
    const storedData = localStorage.getItem('whentheuserislogged');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const correo = parsedData.correo;
      const id = parsedData.responses.id;
      this.userId = id;
      this.auth$.loginSendData(id).subscribe((res) =>{
        this.discord = res.redesSociales.discord;
        this.steam = res.redesSociales.steam;
        this.youtube = res.redesSociales.youtube;
        if(parsedData.UserName == null) {
          this.userName = correo.split('@')[0];

        } else {
          this.userName = res.displayName;
        }
        // Actualizamos el valor del formulario después de obtener los datos
        this.userForm.patchValue({ displayName: this.userName });
        this.userForm.patchValue({redesSociales: {
          discord: this.discord,
          steam: this.steam,
          youtube: this.youtube
        }});



      })
    }
  }

  private inicializarFormulario(): void {
    this.userForm = this.fb.group({
      displayName: [''], // Inicializamos el control con una cadena vacía
      redesSociales: this.fb.group({
        discord: ['', ],
        steam: ['', [Validators.pattern('https?://.+')]],
        youtube: ['', [Validators.pattern('https?://.+')]]
      })
    });
  }

  get redesSociales() {
    return this.userForm.get('redesSociales') as FormGroup;
  }

  // Método para mostrar mensajes de error si es necesario
  getUrlErrorMessage(controlName: string): string {
    const control = this.redesSociales.get(controlName);
    if (control?.hasError('pattern')) {
      return 'Por favor ingrese una URL válida';
    }
    return '';
  }

  onSubmit() {
    if(this.userForm.valid){
      const userData: Usuario = {
        displayName: this.userForm.value.displayName,
        redesSociales: {
          discord: this.userForm.value.redesSociales.discord,
          steam: this.userForm.value.redesSociales.steam,
          youtube: this.userForm.value.redesSociales.youtube,
        }
      };

      this.auth$.updateUserData(this.userId, userData).subscribe(
        (response) => {
          if(response.displayName = '' && response.redesSociales.discord == '' && response.redesSociales.youtube == '' && response.redesSociales.steam == ''){
            this.badLink();
          } else {
            this.goodChange();
          }
          this.userName = '';

        },
        (error) => {
        }
      );
    } else {

    }
  }

  async goodChange() {
    const alert = await this.alertController.create({
      header: 'Cambio exitoso!',
      message: 'Haz actualizado tu perfil correctamente',
      buttons: [
        {
          text: 'OK',
          handler: () =>{
            window.location.reload();
          }
        },
      ],
    });

    await alert.present();
  }

  async badLink() {
    const alert = await this.alertController.create({
      header: 'Error al actualizar!',
      message: 'Revisa los links correctamence',
      buttons: [
        {
          text: 'OK',
          handler: () =>{
            window.location.reload();
          }
        },
      ],
    });

    await alert.present();
  }

}
