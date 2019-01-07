import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from "@angular/http";
import { ExchangeRateService } from './exchangerates.service';
import { ExchangeRatesComponent } from './exchangerates.component';

@NgModule({
  declarations: [
    AppComponent,ExchangeRatesComponent
  ],
  imports: [
    BrowserModule,HttpModule
  ],
  providers: [ExchangeRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
