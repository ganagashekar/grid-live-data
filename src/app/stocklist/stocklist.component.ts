import { isNumber } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StocksService } from '../services/stocks.service';
import { SignalrService } from '../services/signalr.service';
import { Observable, Subscription, map, of } from 'rxjs';
import { Equities } from '../models/equities.model';
import { HttpClient } from '@angular/common/http';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { DataBindingDirective, DataStateChangeEvent, GridDataResult, RowClassArgs } from '@progress/kendo-angular-grid';
import {MatChipsModule} from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { process } from "@progress/kendo-data-query";
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { dropdownModel } from '../models/transaction.model';

@Component({


  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],


})
export class StocklistComponent implements OnInit {

  public statepg: State = {
    skip: 0,
    take: 200

};

  @ViewChild('selectSector') selectSector: MatSelect | any;

  @ViewChild('selectindustry') selectindustry: MatSelect | any;
  public view: Observable<GridDataResult>;
  public gridData: Observable<Stock[]> |any;
  public gridDataEquties:  Observable<Equities[]> | any;
  public prevDataItem!: Stock;
  private stocksUrl: string = 'assets/data.json';
  private immutableData!: any[];
  private immutableDataEquties!: Stock[];
  public previousData: Stock[] = [];
  private signalRSubscription: Subscription | undefined;
  public updateFreq: number = 2000;
  public scrollingData:[] |any ;

  CKTName = new FormControl();
  CKTNameList :  dropdownModel[] =[
    {text :"",value :""},
    {text :"oPM_Percentage",value :"oPM_Percentage"},
    {text :"nPM_Percentage",value :"nPM_Percentage"},

    {text :"profit_Increase",value :"profit_Increase"},
    {text :"revenueIncrease",value :"revenueIncrease"},

    {text :"profitDifference",value :"profitDifferencp0o-eeru0-wruip['excbmn,sqrtuioohce"},
    {text :"revenueDifference",value :"revenueDifference"},

    {text :"quarterEnd",value :"quarterEnd"},
    {text :"estimate_recommendation",value :"estimate_recommendation"},
    {text :"BearishCount",value :"BearishCount"},
    {text :"BulishCount",value :"BulishCount"},
    {text :"fn_eps",value :"fn_eps"},
    {text :"FnUpdatedon",value :"FnUpdatedon"},
    {text :"estimate_meanPriceTarget",value :"estimate_meanPriceTarget"},
    {text :"FuturePercentage",value :"FuturePercentage"},
    {text :"RecentNetProfit",value :"RecentNetProfit"},
    {text :"up_stck",value :"up_stck"},
    {text :"dn_stck",value :"dn_stck"}






  ];
  selectedCKTName : any ;


  ExchangeName = new FormControl();
  ExchangeNameList :  dropdownModel[] =[
    {text :"All",value :"All"},
    {text :"NFO",value :"NFO"},
    {text :"BSE",value :"BSE"},




  ];

  orderName = new FormControl();
  orderNameList :  dropdownModel[] =[
    {text :"",value :""},
    {text :"asc",value :"asc"},
    {text :"desc",value :"desc"},




  ];
  selectedorder : any ;
  selectedExchange:any;

  bgcolor ="#B90143";
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 0;
  Favoriteselected: boolean = false;
  EnabledAutoTradeSelected: boolean = false;
  IncludeDeleted: boolean = false;
  ShowNotification :boolean=false;
  upperckt:boolean=false;
  lowerckt:boolean=false;
  tday:string='';
  WatchList:string='';
  minPriceValue:number=0;
  maxPriceValue:number=5000;
  public gridView: any[];
  tday_1 :boolean=false;
  tday_2 :boolean=false;
  tday_3 :boolean=false;

  w1:boolean=false;
  w2:boolean=false;
  w3:boolean=false;

  targetPrice : boolean =false;

  gridloading:boolean=false;

  bullish:boolean=false;
  bearish:boolean=false;

  IsOrderbyVolumne:boolean=false;

  IsOrderbyaward:boolean=false;

  optionsRange: Options = {
    floor: 0,
    ceil: 5000,
    step:50,


  };
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  constructor(private toastrService: ToastrService,public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {
 this.gridloading=true;
    this.signalRService.connection
    .invoke('GetStocksList',false,false,false,false,false,this.minPriceValue,this.maxPriceValue,this.tday,this.WatchList,false,false,false,false,false,"","",0,200,false,'All')
    .catch((error: any) => {
      console.log(`SGetAllStocks error: ${error}`);
      this.showError(`SGetAllStocks error: ${error}`, "StockList")
    });


  }


  public onFilter(inputValue: string): void {
    debugger;
    this.gridView = process(this.gridDataEquties, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "securityId",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  selectedCKTChange(event: any) {
    debugger;

    this.selectedCKTName=event;
    // this.selected_Operator=event;



  }

  public dataStateChange(state: DataStateChangeEvent): void {
    debugger;
    this.statepg = state;
   this.GetData()
}

GetData(){
  this.signalRService.connection
  .invoke('GetStocksList',this.Favoriteselected,this.upperckt,this.lowerckt,this.EnabledAutoTradeSelected,this.ShowNotification,this.minPriceValue,this.maxPriceValue,this.tday,this.WatchList,this.targetPrice,this.bullish,this.bearish, this.IsOrderbyVolumne,this.IsOrderbyaward,this.selectedCKTName,this.selectedorder,this.statepg.skip,this.statepg.take,this.IncludeDeleted,this.selectedExchange)
  .catch((error: any) => {
    console.log(`SGetAllStocks error: ${error}`);
    alert('GetAllStocks error!, see console for details.');
  });
}

selectedExchangeChange(event: any) {
  debugger;
  this.selectedExchange=event;





}

  selectedorderChange(event: any) {
    debugger;
    this.selectedorder=event;





  }
  toggleSelectedWatch_1(val:string){
    debugger;
    this.WatchList=val;
    this.w1=!this.w1;
    if(!this.w1)
       this.WatchList=''
       this.GetData();
  }

  toggleSelectedWatch_2(val:string){
    debugger;
    this.WatchList=val;
    this.w2=!this.w2;
    if(!this.w2)
       this.WatchList=''
       this.GetData();
  }

      toggleSelectedWatch_3(val:string){
        debugger;
        this.WatchList=val;
    this.w3=!this.w3;
    if(!this.w3)
       this.WatchList=''
       this.GetData();
  }

  toggleSelectedTday1(val:string){
    this.tday=val;
    this.tday_1=!this.tday_1;
    if(!this.tday_1)
       this.tday=''
       this.GetData();
  }

  toggleSelectedTday2(val:string){
    this.tday=val;
    this.tday_2=!this.tday_2;
    if(!this.tday_2)
       this.tday=''
       this.GetData();
  }

  toggleSelectedTday3(val:string){
    this.tday=val;
    this.tday_3=!this.tday_3;
    if(!this.tday_3)
       this.tday=''

       this.GetData();
  }
  GetShowNotification() {

    this.ShowNotification = !this.ShowNotification;
    this.GetData();
  }

  sliderEvent(value: any) {



    this.GetData();
  }
  getAutoTrade(){

    this.EnabledAutoTradeSelected = !this.EnabledAutoTradeSelected;
    this.GetData();

  }

  getExclude(){

    this.IncludeDeleted = !this.IncludeDeleted;
    this.GetData();

  }
  SortOrderbyVolumne() {
    this.IsOrderbyVolumne = !this.IsOrderbyVolumne;
    this.GetData();
  }



  SortOrderbyOrder() {
    this.IsOrderbyaward = !this.IsOrderbyaward;
    this.GetData();
  }


  getbullish(){

    debugger;
    this.bullish = !this.bullish;
    this.GetData();
  }

  getbearish(){
    debugger;
    this.bearish = !this.bearish;
    this.GetData();
  }

  getupperCircuit(){

    debugger;
    this.upperckt = !this.upperckt;
    this.GetData();
  }

  getlowerCircuit(){
    debugger;
    this.lowerckt = !this.lowerckt;
    this.GetData();
  }
  getonlyfavorites(){
    debugger;
    this.Favoriteselected = !this.Favoriteselected;
    this.GetData();
  }

  getTargetprices(){
    debugger;
    this.targetPrice = !this.targetPrice;
    this.GetData();
  }


  public rowCallback = (context: RowClassArgs) => {
    // if (context.dataItem. <= 0) {
    //   return { gold: true };
    // } else {
      return { green: true };
    //}
  };

   relDiff(a: number, b: number) {
    return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
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
        });
    });
}

updatescrollingtext(obj:any){
  let indexToUpdate = [...this.scrollingData].findIndex((item: { symbol: any; }) => item.symbol===obj.symbol)
  let newRow = {
    indexToUpdate,
     id: obj.symbol,
         stockName:obj.stock_name,
         change:obj.change,
       //  volumeNumber:parseInt((parseFloat(obj.ttv.toString().replace('L',''))*100000).toString().replace('C',(parseFloat(obj.ttv.toString().replace('C',''))*100000).toString())),
        symbol:obj.symbol
 };

  if( indexToUpdate !=null) {

this.scrollingData[indexToUpdate] = newRow;
this.scrollingData = Object.assign([], this.scrollingData);
}else{

this.scrollingData.push(newRow);
}
}

sortData(_case: string) {
  switch(_case) {
    case 'stackname':
     return this.gridDataEquties.sort((a: { change: number; }, b: { change: number; }) => (b.change > a.change) ? 1 : -1)

  }
}

getMostFrequent(arr:any) :any {
  const hashmap = arr.reduce( (acc :any, val:any) => {
   acc[val] = (acc[val] || 0 ) + 1
   return acc
},{})
return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}

updateRandomRowWithData(val :any,row:any): any {


// var row = [...this.immutableData].find(x=>x.symbol===val.symbol)
var rowlast=row?.last;
if(row?.symbol==val.symbol && val.last != rowlast ) {



//var nmostnumber = this.getMostFrequent(row.intraday);
  let newRow = {
      ...row,
      id: val.symbol,
          currency:"$",
          stockName:val.stock_name,
          change:val.change,
//mostnumber:nmostnumber,
          volume:val.ttv,
        //  volumeNumber:parseInt((parseFloat(val.ttv.toString().replace('L',''))*100000).toString().replace('C',(parseFloat(val.ttv.toString().replace('C',''))*100000).toString())),
          open: val.open,
          low:val.low,
          high:val.high,
          last :val.last,
          //volume: val.bQty,
          symbol:val.symbol,
          currentPrice: val.last,
          bQty :val.bQty,
          sQty:val.sQty,
          netQtry : val.bQty-val.sQty,
          avgPrice:val.avgPrice,
          ltt:val.ltt,
          href : val.href,
          min :val.min,
          max :val.max,
          // calc_ma: parseFloat(this.getma(row.intraday,null).toString()).toFixed(2),
          // calc_wma:parseFloat(this.getwma(row.intraday,null).toString()).toFixed(2)
  };

  this.previousData = [...this.immutableData];
  let indexToUpdate = this.immutableData.findIndex(item => item.symbol === val.symbol);
  newRow.intraday.push(val.last);
  this.immutableData[indexToUpdate] = newRow;
  // if( this.relDiff(row?.volumeNumber,newRow.volumeNumber) > 90){
  //   this.updatescrollingtext(newRow)
  // }
 // this.gridDataEquties = this.sortData('stackname');
  //newRow.dataopen.push(live.open);
 // newRow.dataavgPrice.push(live.avgPrice);


  return newRow;
}
else{
  return row;
}

}

addormidifyfavorite(p :any) {
debugger;

this.signalRService.connection
.invoke('AddOrModifyFavorite',p.msnid,p.selected==true?1 :0)
.catch((error: any) => {
  console.log(`SGetAllStocks error: ${error}`);
  alert('GetAllStocks error!, see console for details.');
});
}

addormidifyChange(p :any) {
  debugger;

  this.signalRBreezeService.connection
  .invoke('SetBuyChangeAlter',p.symbol,p.value)
  .catch((error: any) => {
    console.log(`SetBuyChangeAlter error: ${error}`);
    alert('SetBuyChangeAlter error!, see console for details.');
  });
  }

  addormidifyTdays(p :any) {
    debugger;

    this.signalRBreezeService.connection
  .invoke('SetForT3',p.symbol,p.value)
  .catch((error: any) => {
    console.log(`SetBuyChangeAlter error: ${error}`);
    alert('SetBuyChangeAlter error!, see console for details.');
  });
    }

    addormidifyWacthList(p :any) {
      debugger;

      this.signalRBreezeService.connection
    .invoke('SetForWacthList',p.symbol,p.value)
    .catch((error: any) => {
      console.log(`SetForWacthList error: ${error}`);
      alert('SetForWacthList error!, see console for details.');
    });
      }
addormidifyIsAutoBuy(p :any) {
  debugger;

  this.signalRService.connection
  .invoke('AddOrModifyAutoTrade',p.msnid,p.selected==true?1 :0)
  .catch((error: any) => {
    console.log(`SGetAllStocks error: ${error}`);
    alert('GetAllStocks error!, see console for details.');
  });
  }
  addormidifyIsExclude(p :any) {
    debugger;

    this.signalRService.connection
    .invoke('AddOrModifyIsExclude',p.msnid,p.selected==true?1 :0)
    .catch((error: any) => {
      console.log(`SGetAllStocks error: ${error}`);
      alert('GetAllStocks error!, see console for details.');
    });
    }


addormidifypoint(p :any) {
  debugger;
  //alert({p.symbol,p.value});
  this.signalRBreezeService.connection
  .invoke('SetBuyPriceAlter',p.symbol,p.value)
  .catch((error: any) => {
    console.log(`SetBuyPriceAlter error: ${error}`);
    alert('SetBuyPriceAlter error!, see console for details.');
  });
  }


  public showSuccess(message : string,tittle :string ): void {
    this.toastrService.success(message, tittle);
  }

  public showInfo(message : string,tittle :string ): void {
    this.toastrService.info(message, tittle);
  }

  public showWarning(message : string,tittle :string ): void {
    this.toastrService.warning(message, tittle);
  }

  public showError(message : string,tittle :string ): void {
    this.toastrService.error(message, tittle);
  }

carDateCalculator(value :string ){

  if(value == "")
     return false;

  return value === 'strongBuy' ? true :  (value === 'buy')  ? true: false
 }

 buyatChangeColor(value:number,savedvalue :number) {
  return value == savedvalue ? true :false
 }

  ngOnInit() {

    this.signalRService.connection.on("SendAddOrModifyFavorite",(data :any) => {

      this.showSuccess(data, "Favorite")
     // alert(data)
    })

    this.signalRBreezeService.connection.on("SendSetBuyChangeAlterNew",(data :any) => {

      this.showSuccess(data, "Chart Change")
     // alert(data)
    })



    this.signalRService.connection.on("SendAddOrModifyAutoTrade",(data :any) => {

      this.showSuccess(data, "Auto Trade Price")
     // alert(data)
    })
    this.signalRService.connection.on("SendAddOrModifyIsExclude",(data :any) => {

      this.showSuccess(data, "Exclude Saved")
     // alert(data)
    })


    this.signalRBreezeService.connection.on("SendSetBuyPriceAlter",(data :any) => {

      this.showSuccess(data, "Chart price")
     // alert(data)
    })


    this.signalRBreezeService.connection.on("SendSetForT3",(data :any) => {

      this.showSuccess(data, "T Added")
     // alert(data)
    })

    this.signalRBreezeService.connection.on("SetForWacthList",(data :any) => {

      this.showSuccess(data, "WatchList")
     // alert(data)
    })

     this.signalRService.connection.on("SendStocksList",(data :any) => {
debugger;
this.gridloading=false;
      var  i=0;



      let res = data.map((val: Equities) => {
        var from =(val.last).toFixed(2);
         var to = ((val.last)-((0.50/100)*val.last)).toFixed(2);

        // var from =61;
        // var to = 63;

        return {
           // Return the new object structure
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
          bQty :val.bQty,
          sQty:val.sQty,
          netQtry : val.bQty-val.sQty,
          avgPrice:val.avgPrice,
          //intraday: Observable<number[]>;
          intraday: val.dataPoint, //val.data,
          dataopen:[val.open],
          dataavgPrice:[val.avgPrice],
          mostnumber:val.last,
          ltt:val.ltt,
          href : val.href,
          min :val.min,
          max :val.max,
          recmdtn : val.recmdtn,
          // int_open: from > to ? to :from,
          // int_last: from < to ? from  :to,

          int_open: from ,
          int_last: to,

          return1w :val.return1w,
           return1m :val.return1m,
          return3m : val.return3m,
          noofrec : val.noofrec,
          beta :val.beta,
          totalBuyQt:val.totalBuyQt,
          totalSellQ:val.totalSellQ,
          eps:val.eps,
          target:val.target,
          stockdetailshref:val.stockdetailshref,
          secId:val.secId,
          isfavorite : val.isfavorite,

          volumeC:val.volumeC,
          securityId:val.securityId,



          return6m:val.return6m,
          return1Year:val.return1Year,
          returnYTD: val.returnYTD,
          priceChange_Day:val.priceChange_Day,
          priceChange_1w:val.priceChange_1w,
          priceChange_1m:val.priceChange_1m,
          priceChange_3m:val.priceChange_3m,
          priceChange_6m:val.priceChange_6m,
          priceChange_1year:val.priceChange_1year,
          priceChange_YTD:val.priceChange_YTD,
          price52Weekslow:val.price52Weekslow,
          price52Weekshigh:val.price52Weekshigh,
          isLowerCircuite:val.isLowerCircuite,
          isUpperCircuite:val.isUpperCircuite,
          isenabledforautoTrade:val.isenabledforautoTrade,
          buyatChange:val.buyatChange,
          tdays :val.tdays,
          wacthList:val.wacthList,

pr_change :val.pr_change,
pr_close:val.pr_close,
pr_open:val.pr_open,
pr_volume:val.pr_volume,
pr_date:val.pr_date,
bullishCount : val.bullishCount,
bearishCount:val.bearishCount,
match :val.match,
awardCount:val.awardCount,
pr_RSI :val.pr_RSI,
pr_Macresult:val.pr_Macresult,
pr_Match:val.pr_Match,
last7DaysChange:val.last7DaysChange,
isIncludeDeleted:val.isIncludeDeleted,



fn_eps :val.fn_eps,
oPM_Percentage :val.oPM_Percentage,
nPM_Percentage :val.nPM_Percentage,
profit_Increase :val.profit_Increase,
revenueIncrease :val.revenueIncrease,
profitDifference :val.profitDifference,
revenueDifference :val.revenueDifference,
quarterEnd :val.quarterEnd,
rowcount:val.rowcount,
futurePercentage:val.futurePercentage,
futurePercentagetext: val.futurePercentage > 0 ? 'Up' : 'Down',

quaterlyResults:val.quaterlyResults

          // calc_ma:this.getma(+[val.last],null),
          // calc_wma:this.getwma([val.last],null)

        //  label: item.abbreviation, value: item.name
        }
        i++;
      });

    //  this.view= subscribe((data) => {
    //     super.next(data);
    //     this.loading = false;
    //   });
    //   debugger;
    //   this.view = this.getDataObservable(res).pipe(

    //     map(data => {

    //       debugger;
    //       return process(data, this.statepg);
    //     }, 4000)


    //  );

      // this.view = {
      //   data: res,
      //   total: res[0].rowcount,
      // };
      var rowcount=res[0].rowcount- res.length
      for (let i = 0; i < rowcount-1; i++) {
        res.push({  });

      }

      this.gridDataEquties = this.getDataObservable(res);



      })


    }
    sliderOptions(value:number,min :number, max : number ): Options {

      return {
        showSelectionBar: true,
        getSelectionBarColor: (value: number): string => {
          if(value >= min){
            return '#2AE02A'
          }
          else{
            return 'red';
          }
        },
        floor:min,
        ceil:max
      };
    }

  public sort: SortDescriptor[] = [
    {
      field: "change",
      dir: "desc",
    },
  ];
  // public rowCallback = (context: RowClassArgs) => {
  //     const previousData = this.previousData;
  //     const index = previousData.findIndex((item: { id: any; }) => item.id === context.dataItem.id);
  //     this.prevDataItem = previousData[index];

  //     if (context.dataItem.change > this.prevDataItem.change) {
  //         return { 'green': true };
  //     } else {
  //         return { 'red': true };
  //     }
  // };
}

export interface Stock {
id: number;
currency: string;
symbol: string;

currentPrice: number;
change_24h: number;
intraday: number[];
dataopen : number[];
dataavgPrice: number[];
change_pct:number;
stockName:number,
change:number,
volume:number,
open: number,
low:number,
high:number,
last :number,
trend:string,
bQty :number,
sQty:number,
netQtry : number,
avgPrice:number,

}
