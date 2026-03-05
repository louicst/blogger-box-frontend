import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    console.log("🚀 Le moteur Angular a démarré !");
    
    this.postService.getPosts().subscribe({
      next: (data: any[]) => {
        console.log("✅ Données reçues avec succès :", data.length);
        this.posts = data;
      },
      error: (err: any) => { 
        console.error("❌ Erreur lors de l'appel API :", err);
      }
    });
  }
}