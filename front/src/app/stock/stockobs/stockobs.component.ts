import { Component, OnDestroy } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashCan,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, tap } from 'rxjs';
import { ArticleObsService } from 'src/app/services/article-obs.service';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-stockobs',
  templateUrl: './stockobs.component.html',
  styleUrls: ['./stockobs.component.scss'],
})
export class StockObsComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashCan = faTrashCan;
  faCircleNotch = faCircleNotch;

  isRemoving = false;

  errorMsg = '';

  selectedArticles = new Set<Article>();

  isRefreshing = false;

  articles$: Observable<Article[]> = this.articleObsService.articles$.pipe(
    tap(() => {
      this.isRefreshing = false;
      this.isRemoving = false;
    })
  );

  constructor(protected readonly articleObsService: ArticleObsService) {}

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

  async remove() {
    try {
      console.log('remove');
      this.isRemoving = true;
      const ids = [...this.selectedArticles].map((a) => a.id);
      await this.articleService.remove(ids);
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
    }
  }

  refresh() {
    try {
      console.log('refresh');
      this.errorMsg = '';
      this.isRefreshing = true;
      this.articleObsService.refresh();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = err instanceof Error ? err.message : `oups. Erreur...`;
    }
  }
}
