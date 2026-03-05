import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🚀 Ajoute FormsModule pour le formulaire
import { PostService } from './services/post';
import { CategoryService } from './services/category'; // 🚀 Import du nouveau service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🚀 Ajoute FormsModule ici
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  posts: any[] = [];
  categories: any[] = []; // Liste des catégories pour le dropdown
  
  // Objet lié au formulaire
  newPost = {
    title: '',
    content: '',
    categoryId: ''
  };

  constructor(
    private postService: PostService,
    private categoryService: CategoryService // Injection
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadCategories(); // On charge les catégories au démarrage
  }

  loadPosts() {
    this.postService.getPosts().subscribe((data) => this.posts = data);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => this.categories = data);
  }

  // La méthode qui appelle ton endpoint de création
  onSubmit() {
    this.postService.createPost(this.newPost).subscribe({
      next: (createdPost) => {
        console.log('Post créé !', createdPost);
        this.loadPosts(); // On rafraîchit la liste pour voir le nouveau post
        this.newPost = { title: '', content: '', categoryId: '' }; // On vide le formulaire
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }
}