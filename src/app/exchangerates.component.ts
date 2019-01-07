import { Component } from '@angular/core';
import { ExchangeRateService} from "./exchangerates.service"
import { FormControl } from '@angular/forms';

@Component({
    selector: 'exchange-rates',
    templateUrl: './exchangerates.component.html',
    styleUrls: ['./exchangerates.component.css']
  })
  export class ExchangeRatesComponent  {
    constructor(private _exchangeRatesService:ExchangeRateService){}

  currencies = ['EUR','USD', 'GBP','AUD','CAD','JPY']
  title = 'app';
  rates;
  order = 1;
  getExchangeRates(){
    let params =  {}
        
        params['base'] = (<HTMLInputElement>document.getElementById("base")).value;  
        params['date_history'] = (<HTMLInputElement>document.getElementById("date_history")).value
        
    
    this._exchangeRatesService.getExchangeRates(params)
      .subscribe( data => {this.rates = data
     });
   
  }

  
  sort(){
    console.log(this.rates.sort('currency'))
    // for (let element of this.rates){
        
    //     console.log(element['currency'])
    // }
  }

}