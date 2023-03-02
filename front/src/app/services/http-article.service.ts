import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    console.log('http article instantiated');
    this.refresh();
  }

  override async refresh(): Promise<void> {
    console.log('refresh');

    this.articles = await lastValueFrom(
      this.http.get<Article[]>(url).pipe(delay(2000))
    );
  }
}
