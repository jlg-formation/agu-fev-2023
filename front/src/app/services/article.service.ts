import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, timer } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { generateId } from '../misc';

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

  add(newArticle: NewArticle) {
    return timer(300).pipe(
      tap(() => {
        const articles = this.articles$.value;
        articles.push({ id: generateId(), ...newArticle });
        this.articles$.next(articles);
      })
    );
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

  refresh() {
    return timer(300).pipe(
      tap(() => {
        this.articles$.next(this.getArticles());
      })
    );
  }

  remove(ids: string[]) {
    return timer(300).pipe(
      tap(() => {
        this.articles$.next(
          this.articles$.value.filter((a) => !ids.includes(a.id))
        );
      })
    );
  }
}
