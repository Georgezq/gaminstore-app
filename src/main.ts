import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(
      () =>
      initializeApp(
        {
          "projectId":"venta-pag",
          "appId":"1:968148514687:web:fea96a4ce164b775bc4c4a",
          "storageBucket":"venta-pag.appspot.com",
          "apiKey":"AIzaSyDtPJTM1xjYTZS4xvHe1r1yBrO5-uX_8z8",
          "authDomain":"venta-pag.firebaseapp.com",
          "messagingSenderId":"968148514687"
        }
      )),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
  ],
});
