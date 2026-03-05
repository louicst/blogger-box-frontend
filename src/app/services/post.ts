import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // On utilise l'URL des environnements
  private resourceUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  /**
   * Session 05 : Récupérer tous les articles
   * page d'accueil
   */
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.resourceUrl);
  }

  /**
   * Session 06 : Créer un nouvel article
   * 'CreationPostRequest'
   */
  createPost(postData: { title: string, content: string, categoryId: string }): Observable<any> {
    return this.http.post<any>(this.resourceUrl, postData);
  }
}