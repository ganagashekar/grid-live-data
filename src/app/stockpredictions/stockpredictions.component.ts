import { Component, OnInit } from '@angular/core';
import { accountTransactions } from '../main-panel/transaction-data/transactions';
import { Stock, StocksService } from '../services/stocks.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import { Equities } from '../models/equities.model';
import { Transactions } from '../models/transaction.model';
import { SignalrService } from '../services/signalr.service';
import { Observable, Subscription } from 'rxjs';
import { SortDescriptor } from '@progress/kendo-data-query';
import { HttpClient } from '@angular/common/http';
import { StockPredicitonModel } from '../models/stockPredictionModel';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';

@Component({
  selector: 'app-stockpredictions',
  templateUrl: './stockpredictions.component.html',
  styleUrls: ['./stockpredictions.component.css']
})
export class StockpredictionsComponent implements OnInit {
  displayedColumns = ['stock_Name', 'symbol'];
  public transactionCards: Transactions[] = accountTransactions;
   // public gridData: StockPredicitonModel[] |any;
    public gridData: Observable<StockPredicitonModel[]> |any;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'determinate';
    value = 0;
    bufferValue = 0;


    public prevDataItem!: Stock;
    private stocksUrl: string = 'assets/data.json';
    private immutableData!: any[];

    public previousData: StockPredicitonModel[] = [];
    private signalRSubscription: Subscription | undefined;
    public updateFreq: number = 2000;


    orderbySize : boolean;

    constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {






    }



    getorderbySize(){
      this.orderbySize = !this.orderbySize;
    }


 getdata(){
  this.signalRBreezeService.connection.invoke('GetTopStockforBuyAutomation',this.orderbySize)
      .catch((error: any) => {
        console.log(`SGetAllStocks error: ${error}`);

      });
 }


    ngOnInit() {
     this. orderbySize=true;
     this.getdata()

      setInterval(()=> {
       this.getdata()
      }, 2 * 1000);
       this.signalRBreezeService.connection.on("SendExportBuyStockAlterFromAPP_IND",(data :any) => {
        debugger;
        var  i=0;
        let res = data.map((val: StockPredicitonModel) => {

          return { // Return the new object structure
            symbol: val.symbol,
            bulishCount:val.bulishCount,
            bearishCount:val.bearishCount,
            ltt:val.ltt,
            candleResult_Price:val.candleResult_Price,

            candleResult_Match:val.candleResult_Match,
            candleResult_Size:val.candleResult_Size,
            candleResult_Body:val.candleResult_Body,
            candleResult_UpperWick:val.candleResult_UpperWick,
            candleResult_LowerWick:val.candleResult_LowerWick,
            candleResult_BodyPct:val.candleResult_BodyPct,
            candleResult_UpperWickPct:val.candleResult_UpperWickPct,

            candleResult_LowerWickPct:val.candleResult_LowerWickPct,
            candleResult_Volume:val.candleResult_Volume,
            macdresult_Macd:val.macdresult_Macd,
            macdresult_Signal:val.macdresult_Signal,
            macdresult_FastEma:val.macdresult_FastEma,
            macdresult_SlowEma:val.macdresult_SlowEma,
            volatilityresults_Sar:val.volatilityresults_Sar,

            volatilityresults_UpperBand:val.volatilityresults_UpperBand,
            volatilityresults_LowerBand:val.volatilityresults_LowerBand,
            stock_Name :val.stock_Name



            // currency:"$",
            // stockName:val.stock_name,
            // change:val.change,
            // volume:val.ttv,
            // open: val.open,
            // low:val.low,
            // high:val.high,
            // last :val.last,
            // //volume: val.bQty,
            // symbol:val.symbol,
            // currentPrice: val.last,
            // bQty :val.bQty,
            // sQty:val.sQty,
            // netQtry : val.bQty-val.sQty,
            // avgPrice:val.avgPrice,
            // //intraday: Observable<number[]>;
            // intraday: [val.last],
            // dataopen:[val.open],
            // dataavgPrice:[val.avgPrice],
            // mostnumber:val.last,
            // bPrice:val.bPrice,
            // sPrice :val.sPrice,

          }
          i++;
        });

        this.gridData = res;// this.getDataObservable(res);



        })


      }


    public sort: SortDescriptor[] = [
      {
        field: "change",
        dir: "desc",
      },
    ];

}
