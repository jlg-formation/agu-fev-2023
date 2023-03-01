import { Component } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashCan = faTrashCan;

  articles: Article[] = [
    { name: 'Tournevis', price: 3.45, qty: 123 },
    { name: 'Pelle', price: 12, qty: 45 },
  ];
}
