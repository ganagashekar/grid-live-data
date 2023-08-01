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



            this.signalRService.connection.on("SendLiveData",(val :string) => {
              var  i=0;
              const obj = JSON.parse(val);
                       this.immutableData = this.immutableData.map((row: Stock) => this.updateRandomRowWithData(row,obj ));
                  observer.next(this.immutableData);
              })


          });
      });


  }

  updateRandomRowWithData(row: Stock,live :any): Stock {


  //var cu_row= [...this.immutableData].find(x=>x.symbol===row.symbol)
  if(row.symbol==live.symbol) {


   // if( row.change_pct != live.change) {
    let changePrice = Math.floor(30 * Math.random()) / 10;
    changePrice *= Math.round(Math.random()) ? 2 : -0.09;

    let changePercentage = Math.floor(30 * Math.random()) / 10;
    changePercentage *= Math.round(Math.random()) ? 1 : -1;

    const percentageValue = row.change_24h + changePercentage;
    const priceValue = row.currentPrice + changePrice;

    let newRow = {
        ...row,
        change_24h: live.last,
        currentPrice: live.last,
        stockName:live.stock_name,
            change:live.change,
            volume:live.ttv,
            open: live.open,
            low:live.low,
            high:live.high,
            last :live.last,




    };
    newRow.intraday.push(live.last);
    newRow.dataopen.push(live.open);

    this.previousData = [...this.immutableData];
    return newRow;

  }
  else{
    // row.intraday.push(live.last);
    // row.dataopen.push(live.open);
    return row;
  }

}


    ngOnInit() {


     // const pairs =  this.signalRService.connection.on("SendAllStocks");
     // console.log(pairs.map((p:Equities[]) => (p)));
       this.signalRService.connection.on("SendAllStocks",(data :any) => {
        debugger;
        var  i=0;
        let res = data.map((val: Equities) => {

          return { // Return the new object structure
            id: val.symbol,
            currency:"$",
            stockName:val.stock_name,
            change:val.change,
            volume:val.ttv,
            open: val.open,
            low:val.low,
            high:val.high,
            last :val.last,
            //volume: val.bQty,
            symbol:val.symbol,
            currentPrice: val.last,

            //intraday: Observable<number[]>;
            intraday: [val.last],
            dataopen:[val.open],

          //  label: item.abbreviation, value: item.name
          }
          i++;
        });

        this.gridDataEquties = this.getDataObservable(res);



        })


      }


    public sort: SortDescriptor[] = [
      {
        field: "change",
        dir: "desc",
      },
    ];
    public rowCallback = (context: RowClassArgs) => {
        const previousData = this.previousData;
        const index = previousData.findIndex((item: { id: any; }) => item.id === context.dataItem.id);
        this.prevDataItem = previousData[index];

        if (context.dataItem.change > 0) {
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

  currentPrice: number;
  change_24h: number;
  intraday: number[];
  dataopen : number[];
  change_pct:number;
  stockName:number,
  change:number,
  volume:number,
  open: number,
  low:number,
  high:number,
  last :number,
  trend:string

}
