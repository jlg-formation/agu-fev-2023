import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    qty: new FormControl(1, [Validators.required, Validators.min(0)]),
  });
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  isAdding = false;
  errorMsg = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.f.controls.qty.valueChanges.subscribe((value) => {
      // if (value === null) {
      //   this.f.controls.qty.setValue(0, {
      //     emitEvent: false,
      //   });
      //   return;
      // }
      console.log('value: ', value);
      // this.f.controls.qty.setValue(Math.floor(value), {
      //   emitEvent: false,
      // });
    });
  }

  async submit() {
    of(void 0)
      .pipe(
        map(() => {
          console.log('submit');
          this.errorMsg = '';
          this.isAdding = true;
          const newArticle = this.f.value as NewArticle;
          console.log('newArticle: ', newArticle);
          return newArticle;
        }),
        switchMap((newArticle) => {
          return this.articleService.add(newArticle);
        }),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = err instanceof Error ? err.message : 'oups. Erreur';
          throw err;
        }),
        finalize(() => {
          this.isAdding = false;
        })
      )
      .subscribe();
  }
}
