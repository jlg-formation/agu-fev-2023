import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFrBE from '@angular/common/locales/fr-BE';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// the second parameter 'fr' is optional
registerLocaleData(localeFrBE, 'fr-BE');

@NgModule({
  declarations: [AppComponent, HomeComponent, LegalComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, FontAwesomeModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-BE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
