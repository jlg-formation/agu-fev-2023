import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { generateId } from '../misc';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { id: 'a1', name: 'Tournevis', price: 3.45, qty: 123 },
    { id: 'a2', name: 'Pelle', price: 12, qty: 45 },
  ];

  add(newArticle: NewArticle) {
    this.articles.push({ id: generateId(), ...newArticle });
  }
}
