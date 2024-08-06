import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent {

  auth$ = inject(AuthService);
  route$ = inject(ActivatedRoute);
  title$ = inject(Title);
  router= inject(Router);

  fecha: string;
  photoUrl: string;
  displayName: string;
  usuarioId: string;
  discord: string;
  steam: string;
  youtube: string;
  hayLinks: boolean = false;

  menuOptions = [
    { name: 'Panel de control', link: 'dashboard' },
    { name: 'Configuración', link: 'settings' },
    { name: 'Deseados', link: 'deseados' },
    { name: 'Pedidos', link: 'pedidos' },
  ];

  selectedComponent: string = 'dashboard';

  loadComponent(link: string) {
    this.selectedComponent = link;
  }

  getUsers() {
    const storedData = localStorage.getItem('whentheuserislogged');
    const parsedData = JSON.parse(storedData);
    const id = parsedData.responses.id;


      this.auth$.loginSendData(id).subscribe((res) =>{
        this.photoUrl = res.imagenperfil;
        this.discord = res.redesSociales.discord;
        this.steam = res.redesSociales.steam;
        this.youtube = res.redesSociales.youtube;
        this.usuarioId = id;

        if(this.steam != '' && this.youtube != '' && this.discord != ''){
          this.hayLinks = false;
        } else{
          this.hayLinks = true;
        }

        const fecha = res.fechacreacion;
        const correo = res.email;
        if(parsedData.UserName == null) {
          this.displayName = correo.split('@')[0];
        } else {
          this.displayName = res.displayName;
        }

        this.title$.setTitle(`Perfil de ${this.displayName}`)

        // Crear una instancia de Date a partir de la fecha almacenada
        const fechaDate = new Date(fecha);

        // Opciones de formato para toLocaleDateString()
        const opciones: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };

        // Formatear la fecha utilizando toLocaleDateString()
        this.fecha = fechaDate.toLocaleDateString('es-ES', opciones);

      });

  }

  constructor(){
    this.getUsers();
  }

}
