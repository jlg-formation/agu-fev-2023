import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { generateId, sleep } from '../misc';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  isLoading = false;
  articles$ = new BehaviorSubject(this.getArticles());

  constructor() {
    this.articles$.subscribe((articles) => {
      localStorage.setItem('articles', JSON.stringify(articles));
    });
  }

  async add(newArticle: NewArticle) {
    await sleep(2000);
    const articles = this.articles$.value;
    articles.push({ id: generateId(), ...newArticle });
    this.articles$.next(articles);
  }

  private getArticles(): Article[] {
    const str = localStorage.getItem('articles');
    if (str === null) {
      return [
        { id: 'a1', name: 'Tournevis', price: 3.45, qty: 123 },
        { id: 'a2', name: 'Pelle', price: 12, qty: 45 },
      ];
    }
    return JSON.parse(str);
  }

  async refresh() {
    await sleep(2000);
    this.articles$.next(this.getArticles());
  }

  async remove(ids: string[]) {
    await sleep(2000);
    this.articles$.next(
      this.articles$.value.filter((a) => !ids.includes(a.id))
    );
  }
}
