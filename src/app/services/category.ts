import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private resourceUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  // Session 06 : Récupérer les catégories pour le formulaire
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.resourceUrl);
  }
}