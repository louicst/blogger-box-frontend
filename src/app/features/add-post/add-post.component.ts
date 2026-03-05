import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // ActivatedRoute included
import { PostService } from '../../services/post';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/post.model';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  categories: Category[] = [];
  postForm!: FormGroup;

  // edit ou create
  isEditMode = false;
  postId: string | null = null;

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
    private router: Router,
    private route: ActivatedRoute // 
  ) {}

  ngOnInit(): void {
    // commence vide
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
    });

    this.loadCategories();

    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isEditMode = true;
      this.postService.getPostById(this.postId).subscribe(post => {
        this.postForm.patchValue({
          title: post.title,
          categoryId: post.category?.id, 
          content: post.content
        });
      });
    }
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  async openAddCategoryModal() {
    const { value: name } = await Swal.fire({
      title: 'Créer une nouvelle catégorie',
      input: 'text',
      inputLabel: 'Nom de la catégorie',
      inputPlaceholder: 'Entrez le nom...',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      inputValidator: (value) => !value ? 'Le nom est obligatoire !' : null
    });

    if (name) {
      this.categoryService.createCategory(name).subscribe({
        next: (newCategory) => {
          this.Toast.fire({ icon: 'success', title: 'Catégorie créée !' });
          this.categoryService.getCategories().subscribe(data => {
            this.categories = data;
            this.postForm.patchValue({ categoryId: newCategory.id });
          });
        },
        error: () => this.Toast.fire({ icon: 'error', title: 'Échec de la création' })
      });
    }
  }

  // MODIFIER la catégorie sélectionnée
  async editCurrentCategory() {
    const categoryId = this.postForm.get('categoryId')?.value;
    const currentCat = this.categories.find(c => c.id === categoryId);

    if (!currentCat) return;

    const { value: newName } = await Swal.fire({
      title: 'Modifier la catégorie',
      input: 'text',
      inputValue: currentCat.name,
      showCancelButton: true,
      inputValidator: (value) => !value ? 'Le nom ne peut pas être vide !' : null
    });

    if (newName && newName !== currentCat.name) {
      this.categoryService.updateCategory(currentCat.id, newName).subscribe({
        next: () => {
          this.Toast.fire({ icon: 'success', title: 'Catégorie mise à jour !' });
          this.loadCategories();
        }
      });
    }
  }

  // SUPPRIMER la catégorie sélectionnée
  async deleteCurrentCategory() {
    const categoryId = this.postForm.get('categoryId')?.value;
    if (!categoryId) return;

    const result = await Swal.fire({
      title: 'Supprimer la catégorie ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Oui, supprimer'
    });

    if (result.isConfirmed) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.Toast.fire({ icon: 'success', title: 'Catégorie supprimée' });
          this.postForm.patchValue({ categoryId: '' });
          this.loadCategories();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Suppression impossible',
            text: 'Cette catégorie contient des articles. Veuillez d\'abord modifier ou supprimer ces articles.',
            confirmButtonColor: '#0d6efd'
          });
          console.error('Erreur lors de la suppression de la catégorie :', err);
        }
      });
    }
  }

  // Protège "sans catégorie" (au final j'ai pas fais ca)
  isDefaultCategorySelected(): boolean {
    const categoryId = this.postForm.get('categoryId')?.value;
    if (!categoryId) return false;
    
    const currentCat = this.categories.find(c => c.id === categoryId);
    return currentCat?.name.toLowerCase() === 'sans catégorie';
  }

  isInvalid(controlName: string): boolean {
    const control = this.postForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  //  Soumission de l'article (Create/update)
  onSubmit() {
    if (this.postForm.invalid) {
      this.Toast.fire({ icon: 'warning', title: 'Please review your post' });
      this.postForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.postId) {
      // UPDATE 
      this.postService.updatePost(this.postId, this.postForm.value).subscribe({
        next: () => {
          this.Toast.fire({ icon: 'success', title: 'Post Updated Successfully' });
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.Toast.fire({ icon: 'error', title: 'Error updating post' });
          console.error(err);
        }
      });
    } else {
      // CREATE 
      this.postService.createPost(this.postForm.value).subscribe({
        next: () => {
          this.Toast.fire({ icon: 'success', title: 'Post Submitted Successfully' });
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.Toast.fire({ icon: 'error', title: 'An error occurred during creation' });
          console.error(err);
        }
      });
    }
  }
}