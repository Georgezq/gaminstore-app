import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  fecha: any;

  getFechaAno() {
    this.fecha = new Date().getFullYear();
    return this.fecha;

  }

  constructor() { }

  ngOnInit() {
    this.getFechaAno();
  }

}
