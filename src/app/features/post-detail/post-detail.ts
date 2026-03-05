import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.html' // 🚀 Updated path to match your exact file name
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe({
        next: (data) => {
          this.post = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l\'article', err);
          this.isLoading = false;
        }
      });
    }
  }
}