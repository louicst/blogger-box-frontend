import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AddPostComponent } from './features/add-post/add-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil avec la liste
  { path: 'add-post', component: AddPostComponent }, // Nouvelle route demandée
  { path: '**', redirectTo: '' } // Redirection par défaut
];