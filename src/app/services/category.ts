// src/app/services/category.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private resourceUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.resourceUrl);
  }

  //  envoie directement la chaîne 
  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(this.resourceUrl, name);
  }

  // envoie le nouveau nom à l'ID spécifique
  updateCategory(id: string, name: string): Observable<Category> {
    return this.http.put<Category>(`${this.resourceUrl}/${id}`, name);
  }

  // supprime la catégorie par son ID
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }
}