import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // 🚀 Ajoute l'import
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🚀 Indispensable pour que le reload (F5) mette à jour l'interface
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()
  ]
};