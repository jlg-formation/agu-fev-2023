import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { ArticleService } from './article.service';

export const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    this.isLoading = true;
    console.log('http article instantiated');
    this.refresh().subscribe();
  }

  override refresh(): Observable<void> {
    console.log('about to refresh http');

    return of(undefined).pipe(
      tap(() => {
        console.log('refreshing');
      }),
      switchMap(() => {
        return this.http.get<Article[]>(url).pipe(delay(300));
      }),
      map((articles) => {
        this.articles$.next(articles);
      }),
      catchError((err) => {
        console.log('err: ', err);
        throw err;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  override add(newArticle: NewArticle): Observable<void> {
    return this.http.post(url, newArticle).pipe(
      delay(300),
      catchError((err) => {
        console.error('err: ', err);
        throw new Error('Technical error');
      }),
      map(() => {
        console.log('article added');
      })
    );
  }

  override remove(ids: string[]): Observable<void> {
    return this.http
      .delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      })
      .pipe(
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical Error');
        }),
        map(() => {
          console.log('articles deleted');
        })
      );
  }
}
