import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { generateId, sleep } from '../misc';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = this.getArticles();

  async add(newArticle: NewArticle) {
    await sleep(2000);
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

  async refresh() {
    await sleep(2000);
    this.articles = this.getArticles();
  }

  async remove(ids: string[]) {
    await sleep(2000);
    this.articles = this.articles.filter((a) => !ids.includes(a.id));
    this.save();
  }

  save() {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }
}
