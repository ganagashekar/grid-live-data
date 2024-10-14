import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Benchmarks } from '../models/benchmarks';

@Component({
  selector: 'app-talibstats',
  templateUrl: './talibstats.component.html',
  styleUrls: ['./talibstats.component.css']
})

export class TalibstatsComponent  {
      
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //displayedColumns = ['stock_Name', 'symbol'];
  displayedColumns = [ 

    'id',
// 'securityId',
  'last',
'stockcode',
'benchmarkReturn',
'totalReturn',
'winRate',
'bestTrade',
'worstTrade',
'avgWinningTrade',
'avgLosingTrade',
'avgWinningTradeDuration',
'avgLosingTradeDuration',
'profitFactor',
'totalTrades',
'totalClosedTrades',
'totalOpenTrades',
// 'maxDrawdown',
// 'maxDrawdownDuration',
'expectancy',
'buyDate',
// 'createdOn',
'bearishCount',
'bulishCount',
// 'bullishCount_100',
// 'bullishCount_95',


];
  displayedFooterColumns = ['id'];
  gridData = new MatTableDataSource<Benchmarks>();
  public transactionCards: Transactions[] = accountTransactions;
   // public gridData: StockPredicitonModel[] |any;
    //public gridData: Observable<StockPredicitonModel[]> |any;
    //gridData : MatTableDataSource<StockPredicitonModel>(null)
    
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
    StockPredicitonModel_data: StockPredicitonModel[] = [];

    orderbySize : boolean;
    SelectedDate : string | any ;

    constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {
   
      this. orderbySize=true;
      this.getdata(0);
 
       // setInterval(()=> {
       //  this.getdata()
       // }, 2 * 1000);
        this.signalRBreezeService.connection.on("SendStocksStatisticsBenchMarks",(data :any) => {
         debugger;
         var  i=0;
         //var data = JSON.parse(datas);
         let res = data.map((val: Benchmarks) => {
 
           return { // Return the new object structure
             id :val.id,
             securityId :val.securityId,
             last:val.last,
             stockcode :val.stockcode,
             benchmarkReturn:val.benchmarkReturn,
             totalReturn:val.totalReturn,
             winRate:val.winRate,
             bestTrade:val.bestTrade,
             worstTrade:val.worstTrade,
             avgWinningTrade:val.avgWinningTrade,
             avgLosingTrade:val.avgLosingTrade,
             avgWinningTradeDuration:val.avgWinningTradeDuration,
             avgLosingTradeDuration:val.avgLosingTradeDuration,
             profitFactor:val.profitFactor,
             totalTrades:val.totalTrades,
             totalClosedTrades:val.totalClosedTrades,
             totalOpenTrades:val.totalOpenTrades,
             maxDrawdown:val.maxDrawdown,
             maxDrawdownDuration:val.maxDrawdownDuration,
             expectancy:val.expectancy,
             buyDate:val.buyDate,
             createdOn:val.createdOn,
             bearishCount:val.bearishCount,
             bulishCount:val.bulishCount,
             bullishCount_100:val.bullishCount_100,
             bullishCount_95:val.bullishCount_95
           }
           i++;
         });
 
        // this.dataSource = new MatTableDataSource(this.users);
        // this.gridData = new MatTableDataSource(this.StockPredicitonModel_data);// this.getDataObservable(res);
       // this.gridData = new MatTableDataSource(res);
        //this.gridData.data = res;
        //this.gridData = new MatTableDataSource<StockPredicitonModel>(res); //pass the array you want in the table
 
        this.gridData =new MatTableDataSource<Benchmarks>(res) //pass the array you want in the table
 
        this.gridData.sort = this.sort;
        this.gridData.paginator = this.paginator;
 
         })
 
 
    }



    getorderbySize(){
      this.orderbySize = !this.orderbySize;
    }
    onDateChange(event: any ): void {
      debugger;
      this.SelectedDate = event.value.toUTCString();
      this.getdata(0);

    }

 getdata( input:number){
  this.signalRBreezeService.connection.invoke('GetStocksStatisticsBenchMarks',
  input,
  this.orderbySize,this.SelectedDate
)
      .catch((error: any) => {
        console.log(`SGetAllStocks error: ${error}`);

      });
 }

 private refresh() {
  console.log("refresh");
//  this.gridData.data = this.users;
}

 ngAfterViewInit() {
  this.gridData.paginator = this.paginator;
  this.gridData.sort = this.sort;
}
Fetchdata(input:number){
  this.getdata(input);
}
applyFilter(filterValue: any) {
  debugger;
  
  filterValue = filterValue.target.value.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.gridData.filter = filterValue;
}

    ngOnInit() {
    
      }


    // public sort: SortDescriptor[] = [
    //   {
    //     field: "change",
    //     dir: "desc",
    //   },
    // ];

}
