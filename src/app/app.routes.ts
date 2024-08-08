import { Routes } from '@angular/router';
import { DashboardComponent } from './components/components-perfil/dashboard/dashboard.component';

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
    title: 'Tendencias',
    loadComponent: () => import('./pages/tendencias/tendencias.page').then( m => m.TendenciasPage)
  },
  {
    path: 'opiniones',
    title: 'Reseñas',
    loadComponent: () => import('./pages/opiniones/opiniones.page').then( m => m.OpinionesPage)
  },
  {
    path: 'noticias',
    title: 'Noticias',
    loadComponent: () => import('./pages/noticias/noticias.page').then( m => m.NoticiasPage)
  },
  {
    path: 'auth',
    title: 'Iniciar Sesión',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage),
  },
  {
    path: 'vernoticia/:id',
    loadComponent: () => import('./pages/vernoticia/vernoticia.page').then( m => m.VernoticiaPage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./pages/carrito/carrito.page').then( m => m.CarritoPage)
  },
];
