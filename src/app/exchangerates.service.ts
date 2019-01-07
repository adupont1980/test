import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { Observable, of } from 'rxjs'; 
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ExchangeRateService {

    constructor (private _http: Http) {}

    sellingRate = 0.05
    buyingRate = 0.05

    getExchangeRates(params:any){
        
        let historyDate = params.date_history
        let query = "start_at="+historyDate+"&end_at="+historyDate+"&base="+params.base;
        let completeUrl = "https://api.exchangeratesapi.io/history?"+query;
        return this._http.get(completeUrl).pipe( 
            map(response => {
                let rates = response.json()
                
                let result = []
                for (let currency in rates['rates'][historyDate]) {
                    if (currency !== params.base){
                        let value = rates['rates'][historyDate][currency]
                        let myRates = {}
                        myRates['currency'] = currency;
                        myRates['buy'] =  (Number(value) - (Number(value)*this.buyingRate)).toFixed(4);
                        myRates['sell'] = (Number(value) + (Number(value)*this.sellingRate)).toFixed(4);
                        result.push(myRates);
                    }
                }
                
                return result
                
            }), 
            catchError(this.handleError('getExchangeRates', []))
        );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
      }

}