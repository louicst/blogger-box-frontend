import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AddPostComponent } from './features/add-post/add-post.component';
import { PostDetailComponent } from './features/post-detail/post-detail'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'edit-post/:id', component: AddPostComponent },
  { path: 'post/:id', component: PostDetailComponent }, 
  { path: '**', redirectTo: '' }
];