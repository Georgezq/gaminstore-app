import { Component, inject, OnInit } from '@angular/core';
import { Portada } from 'src/app/interfaces/portadaIn';
import { PortadaService } from 'src/app/services/firebase/potada/portada.service';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss'],
})
export class PortadaComponent  implements OnInit {

  portada$ = inject(PortadaService);
  portada: Portada[] = [];
  imagen: any;
  nombre: any;
  precio: any;
  loading = true;
  progress = 0;

  constructor() { }

  obtenerPortada(){
    this.portada$.obtenerPortada().subscribe(
      (res:any) => {
        this.portada = res;
        this.portada.forEach(
          (data:any) =>{
            this.imagen = data.imagen;
            this.nombre = data.nombre;
            this.precio = data.precio
          }
        )
      }
    )
  }

  ngOnInit() {
    this.obtenerPortada();
  }

}
