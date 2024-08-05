import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Inicio',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'juego/:id',
    loadComponent: () => import('./pages/mostrar-juego/mostrar-juego.page').then( m => m.MostrarJuegoPage)
  },
  {
    path: 'tendencias',
    loadComponent: () => import('./pages/tendencias/tendencias.page').then( m => m.TendenciasPage)
  },
  {
    path: 'opiniones',
    loadComponent: () => import('./pages/opiniones/opiniones.page').then( m => m.OpinionesPage)
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/noticias/noticias.page').then( m => m.NoticiasPage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },
];
