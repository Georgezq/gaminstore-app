import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star } from 'ionicons/icons';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';


@Component({
  selector: 'app-toolbar-header',
  templateUrl: './toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.scss'],
})
export class ToolbarHeaderComponent implements OnInit {

  @Input() title: string;
  auth$ = inject(AuthService);
  router = inject(Router);

  isLogged = true;
  photoUrl: string;
  usuarioId: string;
  juegosCarritoCount: number;

  constructor() {
    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star });
  }

  private isAuthenticated(){
    this.auth$.isAuthenticated.subscribe((isAuthenticated) => { });
  }

  // obtenerConteo() {
  //   const loggedIndicator = localStorage.getItem('whentheuserislogged');

  //   try {
  //     const parsedData = JSON.parse(loggedIndicator);
  //     const id = parsedData.responses.id;
  //     this.carrito$.obtenerCountByUser(id).subscribe(
  //       (response) => {
  //           this.juegosCarritoCount = response.carritoCount;
  //       },
  //       (error) => {
  //         this.juegosCarritoCount = 0;
  //       }
  //     );
  //   } catch (error) {
  //     this.juegosCarritoCount = 0;  // Si ocurre algún error, establecer el conteo a 0 para mostrar que no hay artículos en el carrito.
  //   }
  // }


  ngOnInit(): void {
    this.isAuthenticated();

    const loggedIndicator = localStorage.getItem('whentheuserislogged');

    if (loggedIndicator) {
      this.isLogged = true;
      const parsedData = JSON.parse(loggedIndicator);

      if (parsedData && parsedData.responses && parsedData.responses.id) {
        const id = parsedData.responses.id;
        this.auth$.loginSendData(id).subscribe((res) => {
          this.photoUrl = res.imagenperfil;
          this.usuarioId = id;
        });
      } else {
        console.error("El objeto parsedData o sus propiedades están indefinidos");
        this.isLogged = false;
      }
    } else {
      this.isLogged = false;
    }
  }




}
