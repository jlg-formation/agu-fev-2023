import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddComponent } from './add/add.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockObsComponent } from './stockobs/stockobs.component';

@NgModule({
  declarations: [StockComponent, AddComponent, StockObsComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class StockModule {}
