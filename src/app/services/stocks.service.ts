import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SignalrService } from './signalr.service';
import { Equities } from '../models/equities.model';

@Injectable({
    providedIn: 'root'
})
export class StocksService {
    private stocksUrl: string = 'assets/data.json';
    private immutableData!: Stock[];
    private immutableDataEquties!: Equities[];
    public previousData: Stock[] = [];
    private signalRSubscription: Subscription | undefined;
    public updateFreq: number = 2000;

    constructor(private http: HttpClient,public signalRService: SignalrService) {


    }

    // getDataObservable(): Observable<Stock[]> {
    //     return new Observable<Stock[]>((observer) => {
    //         this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {


    //             this.immutableData = data ;
    //             this.previousData = data;
    //             observer.next(this.immutableData);

    //             setInterval(() => {
    //                 this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

    //                 observer.next(this.immutableData);
    //             }, this.updateFreq);
    //         });
    //     });
    // }

       getDataObservable(): Observable<Stock[]> {
        return new Observable<Stock[]>((observer) => {
            this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {


                this.immutableData = data ;
                this.previousData = data;
                observer.next(this.immutableData);

                setInterval(() => {
                    this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

                    observer.next(this.immutableData);
                }, this.updateFreq);
            });
        });
    }

   public async invokeGetEquties() {
      await this.signalRService.getEquities();
    }
    getDataObservableEquties(): Observable<Equities[]> {
      debugger;



      return new Observable<Equities[]>((observer) => {
        this.signalRService.getEquities();
        // this.signalRSubscription = this.signalRService.getEquities().subscribe(
        //   (data) => {
        //     this.immutableDataEquties = data ;
        // });
          // this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {


          //     this.immutableData = data ;
          //     this.previousData = data;
          //     observer.next(this.immutableData);

          //     // setInterval(() => {
          //     //     this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

          //     //     observer.next(this.immutableData);
          //     // }, this.updateFreq);
          // });
      });
    }

    updateRandomRowWithData(row: Stock): Stock {
        const shouldUpdateData = Math.random() < 1000;

        if (shouldUpdateData) {
            let changePrice = Math.floor(30 * Math.random()) / 10;
            changePrice *= Math.round(Math.random()) ? 2 : -0.09;

            let changePercentage = Math.floor(30 * Math.random()) / 10;
            changePercentage *= Math.round(Math.random()) ? 1 : -1;

            const percentageValue = row.change_24h + changePercentage;
            const priceValue = row.currentPrice + changePrice;

            let newRow = {
                ...row,
                change_24h: percentageValue,
                currentPrice: priceValue,




            };
           newRow.intraday.push(Math.round(Math.random()+1));

            this.previousData = [...this.immutableData];
            return newRow;
        } else {
          row.intraday.push(Math.round(Math.random()+1));
            return row;
        }
    }
}

export interface Stock {
    id: number;
    currency: string;
    symbol: string;
    volume: number;
    currentPrice: number;
    change_24h: number;
    //intraday: Observable<number[]>;
    intraday: number[];
    change_pct:number;

}
