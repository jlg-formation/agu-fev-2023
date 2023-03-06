import { Component, OnDestroy } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
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
  faCircleNotch = faCircleNotch;

  isRemoving = false;

  errorMsg = '';

  selectedArticles = new Set<Article>();

  isRefreshing = false;

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
    of(void 0)
      .pipe(
        map(() => {
          console.log('remove');
          this.errorMsg = '';
          this.isRemoving = true;
          const ids = [...this.selectedArticles].map((a) => a.id);
          return ids;
        }),
        switchMap((ids) => {
          return this.articleService.remove(ids);
        }),
        finalize(() => {
          this.isRemoving = false;
        }),
        tap(() => {
          this.selectedArticles.clear();
        }),
        switchMap(() => this.articleService.refresh()),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg =
            err instanceof Error ? err.message : 'Technical Error';
          throw err;
        })
      )
      .subscribe();
  }

  refresh() {
    of(void 0)
      .pipe(
        tap(() => {
          console.log('refresh');
          this.errorMsg = '';
          this.isRefreshing = true;
        }),
        switchMap(() => this.articleService.refresh()),
        finalize(() => {
          console.log('refreshed');
          this.isRefreshing = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg =
            err instanceof Error ? err.message : `oups. Erreur...`;
          throw err;
        })
      )
      .subscribe();
  }
}
