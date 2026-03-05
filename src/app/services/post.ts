import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private resourceUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  // Get all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.resourceUrl);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.resourceUrl}/${id}`);
  }

  // Create a new post
  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(this.resourceUrl, post);
  }

  //  Update an existing post
  updatePost(id: string, post: any): Observable<Post> {
    return this.http.put<Post>(`${this.resourceUrl}/${id}`, post);
  }

  // Delete a post
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }
}