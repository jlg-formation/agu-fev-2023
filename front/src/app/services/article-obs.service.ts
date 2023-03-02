import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Article } from '../interfaces/article';

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ArticleObsService {
  articles$: Observable<Article[]>;

  private onRefresh = new BehaviorSubject<void>(void 0);

  constructor(private http: HttpClient) {
    this.articles$ = this.onRefresh.pipe(switchMap(() => this.getArticles()));
  }

  getArticles() {
    return this.http.get<Article[]>(url);
  }

  refresh() {
    this.onRefresh.next();
  }
}
