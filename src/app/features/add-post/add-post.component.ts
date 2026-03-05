import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post';
import { CategoryService } from '../../services/category';
import { Category, CreatePostRequest } from '../../models/post.model';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  categories: Category[] = [];
  
  // Utilisation de CreatePostRequest (Omit + Intersection/Append)
  newPost: CreatePostRequest = { title: '', content: '', categoryId: '' };

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  onSubmit() {
    this.postService.createPost(this.newPost).subscribe(() => {
      this.router.navigate(['/']); // Redirection après création
    });
  }
}