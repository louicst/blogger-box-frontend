import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AddPostComponent } from './features/add-post/add-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'add-post', component: AddPostComponent }, 
  { path: 'edit-post/:id', component: AddPostComponent }, // 🚀 Remontée avant le catch-all
  { path: '**', redirectTo: '' } // 🛑 Le filet de sécurité tout à la fin
];