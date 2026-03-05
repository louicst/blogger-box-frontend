import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 🚀 REQUIRED FOR SEARCH INPUTS
import { PostService } from '../../services/post';
import { CategoryService } from '../../services/category'; // 🚀 TO GET CATEGORIES
import { Post, Category } from '../../models/post.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 👈 Added FormsModule
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // 🚀 Keep original data safe, display the filtered data
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  categories: Category[] = [];

  // 🚀 Filter States
  searchTerm: string = '';
  selectedCategoryId: string = '';
  sortBy: string = 'newest';

  constructor(
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadCategories();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((data) => {
      this.allPosts = data;
      this.applyFilters(); // Apply immediately when data loads
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  // 🧠 The magic function that handles Search, Filter, and Sort all at once!
  applyFilters(): void {
    let tempPosts = [...this.allPosts];

    // 1. TEXT SEARCH (Checks title and content)
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempPosts = tempPosts.filter(p => 
        (p.title && p.title.toLowerCase().includes(term)) || 
        (p.content && p.content.toLowerCase().includes(term))
      );
    }

    // 2. CATEGORY FILTER
    if (this.selectedCategoryId) {
      tempPosts = tempPosts.filter(p => p.category?.id === this.selectedCategoryId);
    }

    // 3. SORTING
    tempPosts.sort((a, b) => {
      if (this.sortBy === 'newest') {
        return new Date(b.createdDate || 0).getTime() - new Date(a.createdDate || 0).getTime();
      } else if (this.sortBy === 'oldest') {
        return new Date(a.createdDate || 0).getTime() - new Date(b.createdDate || 0).getTime();
      } else if (this.sortBy === 'az') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    // Update the UI
    this.filteredPosts = tempPosts;
  }

  // 🗑️ Delete logic
  async deletePost(postId: string) {
    const result = await Swal.fire({
      title: 'Delete this post?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Post deleted', showConfirmButton: false, timer: 3000 });
          this.loadPosts(); // Refresh the grid
        },
        error: (err) => {
          Swal.fire('Error', 'Could not delete the post.', 'error');
          console.error(err);
        }
      });
    }
  }
}