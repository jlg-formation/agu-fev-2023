import { Component, OnDestroy } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;

  selectedArticles = new Set<Article>();

  constructor(protected readonly articleService: ArticleService) {}

  ngOnDestroy(): void {
    console.log('destroy stock');
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  remove() {
    console.log('remove');
    const ids = [...this.selectedArticles].map((a) => a.id);
    this.articleService.remove(ids);
    this.selectedArticles.clear();
  }

  refresh() {
    console.log('refresh');
    this.articleService.refresh();
  }
}
