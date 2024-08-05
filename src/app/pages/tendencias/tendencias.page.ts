import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ComponentesModule } from 'src/app/components/components.module';
import { TendenciasComponents } from 'src/app/components/components-tendencias/tendencias-components.module';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.page.html',
  styleUrls: ['./tendencias.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ComponentesModule,
    TendenciasComponents
  ]
})
export class TendenciasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
