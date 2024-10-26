import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { DashboardCountsForQTY, DashboardStats, Maain_Dahsbaord_Stats, main_Dashboard_Stats_Nifty } from '../models/news.model';

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
    public qtyData: Observable<DashboardCountsForQTY[]> |any;
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'determinate';
    value = 0;
    bufferValue = 0;
    counter=10;

    public dashboardStats: DashboardStats;
    public maain_Dahsbaord_Stats: Maain_Dahsbaord_Stats
    public main_Dashboard_Stats_Niftys: main_Dashboard_Stats_Nifty
    private stocksUrl: string = 'assets/data.json';
    private immutableData!: any[];

    public previousData: StockPredicitonModel[] = [];
    private signalRSubscription: Subscription | undefined;
    public updateFreq: number = 2000;

    displayedqtyColumns: string[] = ['buy', 'sell', 'type', 'xtimes','symbol'];
    orderbySize : boolean;
    SelectedDate : string | any ;
    constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {
     

      this.main_Dashboard_Stats_Niftys= {
      nifty_Call_Buying : 0,
      nifty_Put_Buying:0,
      nifty_Put_Long_Covering:0,
      nifty_Put_Short_Covering:0,
      nifty_Put_Writing:0,
      nifty_Call_Long_Covering:0,
      nifty_Call_Short_Covering:0,
      nifty_Call_Writing:0,
      lastupdated_Nifty_Trader_Date:''


  
      },
      this.maain_Dahsbaord_Stats ={
        psU_Current_AvgChange:0,
        psU_Current_Decline:0,
        option_Current_Advance: 0,
        bankNifty_Current_Advance :0,
        bankNifty_Current_AvgChange : 0,
        bankNifty_Current_Decline:0,
        bankNifty_Previous_Advance:0,
        bankNifty_Previous_AvgChange:0,
        bankNifty_Previous_Decline:0,
        bankNiftyName:'BANKNIFTY',
        nifty_Current_Advance:0,
        nifty_Current_AvgChange:0,
        nifty_Current_Decline:0,
        nifty_Previous_Advance:0,
        nifty_Previous_AvgChange:0,
        nifty_Previous_Decline:0,
        niftyName:"NIFTY",
        option_Current_AvgChange:0,
        option_Current_Decline:0,
        option_Previous_Advance:0,
        option_Previous_AvgChange:0,
        option_Previous_Decline:0,
        optionName:'Option',
        psU_Current_Advance:0,
        psU_Previous_Advance:0,
        psU_Previous_AvgChange:0,
        psU_Previous_Decline:0,
        psUName :"PSU",
        energy_Advance:0,
        engery_Decline:0,
        financials_Advance:0,
        financials_Decline:0,
        healthcare_Advance:0,
        healthcare_Decline:0,
        industrials_Advance:0,
        industrials_Decline:0,
        realEstate_Advance:0,
        realEstate_Decline:0,
        technology_Advance:0,
        technology_Decline:0,
        totalSectorAvg:0,
        totalSectorAvg_Advance:0,
        totalSectorAvg_Decline:0,
        lastUpdateDateTime:''




      }
    }



    getorderbySize(){
      this.orderbySize = !this.orderbySize;
    }
    onDateChange(event: any ): void {
     
      this.SelectedDate = event.value.toUTCString();
      this.getdata()

    }

 getdata(){
  this.signalRBreezeService.connection.invoke('GetTopStockforBuyAutomation',this.orderbySize,this.SelectedDate)
      .catch((error: any) => {
        console.log(`SGetAllStocks error: ${error}`);

      });
 }

 getstatsNiftyTrder(){
 
  this.signalRBreezeService.connection.invoke('GetDashboard_option_data_NiftyTrader')
      .catch((error: any) => {
        console.log(`GetDashboard_option_data_NiftyTrader error: ${error}`);

      });
 }

 getstats_qty(){
 
  this.signalRBreezeService.connection.invoke('GetDashboard_qty_data')
      .catch((error: any) => {
        console.log(`GetDashboard_qty_data error: ${error}`);

      });
 }


 getstats(){
 
  this.signalRBreezeService.connection.invoke('GetDashboard_option_data')
      .catch((error: any) => {
        console.log(`GetDashboard_option_data error: ${error}`);

      });
 }

    ngOnInit() {
     
     this. orderbySize=true;
     
     
     setInterval(()=> {
      this.getstats()
     
    }, 5 * 1000);

    setInterval(()=> {
      this.getstats_qty()
     
    }, 5 * 1000);

      setInterval(()=> {
       
       this.getdata()
      }, 15 * 1000);

      setInterval(()=> {
       
        this.getstatsNiftyTrder()
       }, 30 * 1000);

      this.signalRBreezeService.connection.on("SendGetDashboard_option_data_NiftyTrader",(data :main_Dashboard_Stats_Nifty) => {

        this.main_Dashboard_Stats_Niftys = {
          nifty_Call_Buying: data.nifty_Call_Buying,
          nifty_Call_Long_Covering :data.nifty_Call_Long_Covering,
          nifty_Call_Short_Covering :data.nifty_Call_Short_Covering,
          nifty_Call_Writing :data.nifty_Call_Writing,
          nifty_Put_Buying :data.nifty_Put_Buying,
          nifty_Put_Long_Covering :data.nifty_Put_Long_Covering,
          nifty_Put_Short_Covering :data.nifty_Put_Short_Covering,
          nifty_Put_Writing :data.nifty_Put_Buying,
          lastupdated_Nifty_Trader_Date:data.lastupdated_Nifty_Trader_Date,

        }
      });

      this.signalRBreezeService.connection.on("SendGetDashboard_option_data",(data :Maain_Dahsbaord_Stats) => {
       

        this.maain_Dahsbaord_Stats ={
          psU_Current_AvgChange:data.psU_Current_AvgChange,
          psU_Current_Decline:data.psU_Current_Decline,
          option_Current_Advance: data.option_Current_Advance,
          bankNifty_Current_Advance :data.bankNifty_Current_Advance,
          bankNifty_Current_AvgChange : data.bankNifty_Current_AvgChange,
          bankNifty_Current_Decline:data.bankNifty_Current_Decline,
          bankNifty_Previous_Advance:data.bankNifty_Previous_Advance,
          bankNifty_Previous_AvgChange:data.bankNifty_Previous_AvgChange,
          bankNifty_Previous_Decline:data.bankNifty_Previous_Decline,
          bankNiftyName:'BANKNIFTY',
          nifty_Current_Advance:data.nifty_Current_Advance,
          nifty_Current_AvgChange:data.nifty_Current_AvgChange,
          nifty_Current_Decline:data.nifty_Current_Decline,
          nifty_Previous_Advance:data.nifty_Previous_Advance,
          nifty_Previous_AvgChange:data.nifty_Previous_AvgChange,
          nifty_Previous_Decline:data.nifty_Previous_Decline,
          niftyName:"NIFTY",
          option_Current_AvgChange:data.option_Current_AvgChange,
          option_Current_Decline:data.option_Current_Decline,
          option_Previous_Advance:data.option_Previous_Advance,
          option_Previous_AvgChange:data.option_Previous_AvgChange,
          option_Previous_Decline:data.option_Previous_Decline,
          optionName:'Option',
          psU_Current_Advance:data.psU_Current_Advance,
          psU_Previous_Advance:data.psU_Previous_Advance,
          psU_Previous_AvgChange:data.psU_Previous_AvgChange,
          psU_Previous_Decline:data.psU_Previous_Decline,
          psUName :"PSU",

          energy_Advance :data.energy_Advance,
          engery_Decline:data.engery_Decline,
          financials_Advance: data.financials_Advance,
          financials_Decline:data.financials_Decline,
          healthcare_Advance:data.healthcare_Advance,
          healthcare_Decline:data.healthcare_Decline,
          industrials_Advance:data.industrials_Advance,
          industrials_Decline:data.industrials_Decline,
          realEstate_Advance:data.realEstate_Advance,
          realEstate_Decline:data.realEstate_Decline,
          technology_Advance:data.technology_Advance,
          technology_Decline:data.technology_Decline,
          totalSectorAvg:data.totalSectorAvg,

          totalSectorAvg_Advance:data.totalSectorAvg_Advance,
          totalSectorAvg_Decline:data.totalSectorAvg_Decline,
          lastUpdateDateTime:data.lastUpdateDateTime

         

        }

      })

      this.signalRBreezeService.connection.on("SendGetDashboard_qty_data",(data :any) => {

        let res = data.map((val: DashboardCountsForQTY) => { 

        return{
        buy:val.buy,
        sell:val.sell,
        symbol:val.symbol,
        type:val.type,
        xtimes:val.xTimes,
        lastUpdatedOn:val.lastUpdatedOn,
        icons:val.type=='BUY' ? '&uarr;':'&darr;',
        chg:val.chg,
        
      
        

        } 
        })

        this.qtyData = res

      })

       this.signalRBreezeService.connection.on("SendExportBuyStockAlterFromAPP_IND",(data :any) => {
        //
        // this.counter=this.counter+5;
        // this.dashboardStats ={
        //   current_Change:this.counter+1,
        //   current_decline:this.counter+2,
        //   current_advance: this.counter+3,
        // }
       // this.updateFreq=667
       //this.dashboardStats.current_Change= 132;
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
            stock_Name :val.stock_Name,
            bullishCount_95:val.bullishCount_95,
            bullishCount_100:val.bullishCount_100



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
