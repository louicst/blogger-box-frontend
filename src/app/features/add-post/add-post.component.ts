import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/post.model';
import Swal from 'sweetalert2'; // 🚀 Import de SweetAlert2

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  categories: Category[] = [];
  postForm!: FormGroup;

  // Configuration du Mixin SweetAlert2 (Toast)
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
    });

    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  isInvalid(controlName: string): boolean {
    const control = this.postForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    // ⚠️ CAS 1 : Le formulaire est invalide au moment de l'envoi
    if (this.postForm.invalid) {
      this.Toast.fire({
        icon: 'warning',
        title: 'Please review your post'
      });
      // On marque tous les champs comme "touched" pour afficher les erreurs Bootstrap
      this.postForm.markAllAsTouched();
      return;
    }

    // ✅ CAS 2 : Le formulaire est valide
    this.postService.createPost(this.postForm.value).subscribe({
      next: () => {
        // Notification de succès
        this.Toast.fire({
          icon: 'success',
          title: 'Post Submitted Successfully'
        });
        // Redirection vers l'accueil pour voir l'article
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.Toast.fire({
          icon: 'error',
          title: 'An error occurred during creation'
        });
        console.error(err);
      }
    });
  }
}