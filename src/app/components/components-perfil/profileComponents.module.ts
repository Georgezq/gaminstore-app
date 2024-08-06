import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TruncateJuegosPipe } from 'src/app/pipes/truncate-juegos.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsUserComponent } from './settings-user/settings-user.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { ListaDeseadosComponent } from './lista-deseados/lista-deseados.component';



@NgModule({
  declarations: [ HeaderProfileComponent, DashboardComponent, SettingsUserComponent, ListaPedidosComponent,
    ListaDeseadosComponent
  ],
  exports: [ HeaderProfileComponent, DashboardComponent, SettingsUserComponent, ListaPedidosComponent,
    ListaDeseadosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    TruncateJuegosPipe,
    RouterLink,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ProfileMComponents { }
