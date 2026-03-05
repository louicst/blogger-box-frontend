import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // 🚀 Import indispensable
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/post.model';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // 🛠️ ReactiveFormsModule ici
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  categories: Category[] = [];
  postForm!: FormGroup; // Déclaration du formulaire

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Initialisation du formulaire avec les validations demandées
    this.postForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(150)
      ]],
      categoryId: ['', [Validators.required]],
      content: ['', [
        Validators.required, 
        Validators.maxLength(2500)
      ]]
    });

    // 2. Chargement des catégories pour le select
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  // Helper pour vérifier la validité des champs dans le HTML
  isInvalid(controlName: string): boolean {
    const control = this.postForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.postForm.valid) {
      // On envoie les données du formulaire directement
      this.postService.createPost(this.postForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}