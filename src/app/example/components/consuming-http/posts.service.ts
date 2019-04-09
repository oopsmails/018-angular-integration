import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypiCodePost } from '@app/shared/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  resourceUrl = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {
  }

  getAllPosts(): Observable<Array<TypiCodePost>> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.httpClient.get<Array<TypiCodePost>>(this.resourceUrl, { headers });
  }

  create(post: TypiCodePost): Observable<TypiCodePost> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });
    return this.httpClient.post<TypiCodePost>(this.resourceUrl, { headers });
  }

  update(post: TypiCodePost): Observable<TypiCodePost> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });
    return this.httpClient.patch<TypiCodePost>(this.resourceUrl + '/' + post.id, { headers });
  }

  delete(post: TypiCodePost): Observable<TypiCodePost> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });
    return this.httpClient.delete<TypiCodePost>(this.resourceUrl + '/' + post.id, { headers });
  }
}
