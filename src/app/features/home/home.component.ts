import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // We will need this for the Edit button later
import { PostService } from '../../services/post';
import { Post } from '../../models/post.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((data) => this.posts = data);
  }

  // 🗑️ Function to delete a post with confirmation
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
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Post deleted successfully',
            showConfirmButton: false,
            timer: 3000
          });
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