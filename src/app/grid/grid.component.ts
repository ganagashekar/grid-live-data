import { Component } from '@angular/core';
import { GridDataResult, RowClassArgs } from '@progress/kendo-angular-grid';
import { Observable, Subscription, of } from 'rxjs';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';
// import { Stock, StocksService } from '../services/stocks.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { HttpClient } from '@angular/common/http';
import { SignalrService } from '../services/signalr.service';
import { Equities } from '../models/equities.model';

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
    animations: [
        trigger('positiveState', [
            transition('void => *', []),
            transition('* => void', []),
            transition('* => *', [
                animate(1500, keyframes([style({ backgroundColor: '#32CD32', offset: 0.0 }), style({ backgroundColor: 'inherit', offset: 1.0 })]))
            ])
        ]),
        trigger('negativeState', [
            transition('void => *', []),
            transition('* => void', []),
            transition('* => *', [
                animate(1500, keyframes([style({ backgroundColor: '#FF0000', offset: 0.0 }), style({ backgroundColor: 'inherit', offset: 1.0 })]))
            ])
        ])
    ]
})
export class GridComponent {
    public gridData: Observable<Stock[]> |any;
    public gridDataEquties: Observable<Equities[]> | any;
    public prevDataItem!: Stock;
    private stocksUrl: string = 'assets/data.json';
    private immutableData!: Stock[];
    private immutableDataEquties!: Stock[];
    public previousData: Stock[] = [];
    private signalRSubscription: Subscription | undefined;
    public updateFreq: number = 2000;

    constructor(public signalRService: SignalrService, private http: HttpClient) {

      this.signalRService.connection
      .invoke('GetAllStocks')
      .catch((error: any) => {
        console.log(`SGetAllStocks error: ${error}`);
        alert('GetAllStocks error!, see console for details.');
      });

      //signalRService.startConnection();
       // this.gridData = this.stockService.getDataObservable();
        // this.gridDataEquties = this.stockService.getDataObservableEquties();

       //orderBy(gridData., [{ field: "name", dir: "asc" }])
    }


    getDataObservable(equities :Stock[]): Observable<Stock[]> {
      return new Observable<Stock[]>((observer) => {
          this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {

            const obsof1= of(equities);
            obsof1.subscribe((data: Stock[]) => {
              this.immutableData = data ;
              this.previousData = data;
              observer.next(this.immutableData);
            })
              setInterval(() => {
                  this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

                  observer.next(this.immutableData);
              }, this.updateFreq);
          });
      });

    //   return new Observable<Stock[]>((observer) => {

    //        const obsof1= of(equities);
    //      obsof1.subscribe((data: Stock[]) => {


    //          this.immutableDataEquties = data ;
    //          this.previousData = data;
    //          observer.next(this.immutableData);

    //          // setInterval(() => {
    //          //     this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

    //          //     observer.next(this.immutableData);
    //          // }, this.updateFreq);
    //      });
    //  });
      // return new Observable<Stock[]>((observer) => {
      //     this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {


      //         this.immutableData = data ;
      //         this.previousData = data;
      //         observer.next(this.immutableData);

      //         // setInterval(() => {
      //         //     this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

      //         //     observer.next(this.immutableData);
      //         // }, this.updateFreq);
      //     });
      // });
  }


  //   getDataObservable(): Observable<Stock[]> {
  //     return new Observable<Stock[]>((observer) => {
  //         this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {


  //             this.immutableData = data ;
  //             this.previousData = data;
  //             observer.next(this.immutableData);

  //             // setInterval(() => {
  //             //     this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row));

  //             //     observer.next(this.immutableData);
  //             // }, this.updateFreq);
  //         });
  //     });
  // }

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

    ngOnInit() {


     // const pairs =  this.signalRService.connection.on("SendAllStocks");
     // console.log(pairs.map((p:Equities[]) => (p)));
       this.signalRService.connection.on("SendAllStocks",(data :any) => {
        var  i=0;
        let res = data.map((val: Equities) => {

          return { // Return the new object structure
            id: i,
            currency:"$",
            symbol:val.symbol,
            volume: 123,
            currentPrice: val.avgPrice,
            change_24h: val.change,
            //intraday: Observable<number[]>;
            intraday: [1,2,3,4],
            change_pct:3
          //  label: item.abbreviation, value: item.name
          }
          i++;
        });

        this.gridDataEquties = this.getDataObservable(res);
       // this.gridData=data;
       //this.gridDataEquties= (data.map((p:Equities[]) => (p)));
      // console.log( this.gridDataEquties);

        })
      }
    // //  this.signalRService.startConnection();
    //   this.signalRService.startConnectionBuilder().build().start().then(()=> this.stockService.invokeGetEquties()).catch((err: any) => console.log('Error while starting connection: ' + err))

    // //   .start().then(this.stockService.getDataObservableEquties())
    // //     .catch((err: any) => console.log('Error while starting connection: ' + err))
    // //  // this.gridDataEquties = this.stockService.getDataObservableEquties();

    //  this.signalRService.addTransferChartDataListener();
    //   //this.startHttpRequest();
   // }

    // private startHttpRequest = () => {
    //   this.http.get('https://localhost:5001/api/chart')
    //     .subscribe(res => {
    //       console.log(res);
    //     })
    // }

    public sort: SortDescriptor[] = [
      {
        field: "change_24h",
        dir: "desc",
      },
    ];
    public rowCallback = (context: RowClassArgs) => {


        const previousData = this.previousData;
        const index = previousData.findIndex((item: { id: any; }) => item.id === context.dataItem.id);
        this.prevDataItem = previousData[index];

        if (context.dataItem.change_24h > 0) {
            return { 'price-up': true };
        } else {
            return { 'price-down': true };
        }
    };
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
