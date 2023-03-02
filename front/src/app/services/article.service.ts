import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { generateId } from '../misc';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.getArticles();

  add(newArticle: NewArticle) {
    this.articles.push({ id: generateId(), ...newArticle });
    this.save();
  }

  getArticles(): Article[] {
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
    this.articles = this.getArticles();
  }

  remove(ids: string[]) {
    this.articles = this.articles.filter((a) => !ids.includes(a.id));
    this.save();
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }
}
