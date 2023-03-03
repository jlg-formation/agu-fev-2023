import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, lastValueFrom } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    this.isLoading = true;
    console.log('http article instantiated');
    this.refresh();
  }

  override async refresh(): Promise<void> {
    console.log('refresh');

    const articles = await lastValueFrom(
      this.http.get<Article[]>(url).pipe(delay(2000))
    );
    this.articles$.next(articles);
    this.isLoading = false;
  }

  override async add(newArticle: NewArticle): Promise<void> {
    await lastValueFrom(
      this.http.post(url, newArticle).pipe(
        delay(300),
        catchError((err) => {
          console.error('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
    console.log('article added');
  }

  override async remove(ids: string[]): Promise<void> {
    await lastValueFrom(
      this.http
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
          })
        )
    );
    console.log('articles deleted');
  }
}
