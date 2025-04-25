import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PlotBand, SeriesLine } from '@progress/kendo-angular-charts';
import { Observable } from 'rxjs';
import { Path, Group, Text } from "@progress/kendo-drawing";
import { Rect } from "@progress/kendo-drawing/geometry";
import { RenderEvent } from "@progress/kendo-angular-charts";
import { SignalrService } from '../services/signalr.service';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';
import { StocksService } from '../services/stocks.service';
import { HttpClient } from '@angular/common/http';
import { Dashboard_AmountOrCHG, Dashboard_High_low, DashboardCountsForQTY, DashboardStats, Maain_Dahsbaord_Stats, main_Dashboard_Stats_Nifty, TrendModel } from '../models/news.model';
@Component({
  selector: 'app-trendchartmultiple',
  templateUrl: './trendchartmultiple.component.html',
  styleUrls: ['./trendchartmultiple.component.css']
})
export class TrendchartmultipleComponent implements OnInit {

  
    @ViewChild('container', { read: ViewContainerRef, static: true })
      public popupContainer: ViewContainerRef | undefined;
    // @Input() public chartdata : Observable<number[]> | undefined;
     @Input() public min: number = 0;
     @Input() public max: number = 0;
      @Input() public Lastdata: number[] = [];
      @Input() public gainhigh: number[] = [];
      @Input() public fallhigh: number[] = [];
      @Input() public CurrentData : any;
      @Input() public dataopen: number[] = [];


      @Input() public ttvLastdata: number[] = [];
      @Input() public ttvgainhigh: number[] = [];
      @Input() public ttvfallhigh: number[] = [];
      @Input() public ttvCurrentData : any;
      @Input() public ttvdataopen: number[] = [];


      @Input() public bqtyLastdata: number[] = [];
      @Input() public bqtygainhigh: number[] = [];
      @Input() public bqtyfallhigh: number[] = [];
      @Input() public bqtyCurrentData : any;
      @Input() public bqtydataopen: number[] = [];

      @Input() public sqtyLastdata: number[] = [];
      @Input() public sqtygainhigh: number[] = [];
      @Input() public sqtyfallhigh: number[] = [];
      @Input() public sqtyCurrentData : any;
      @Input() public sqtydataopen: number[] = [];

      @Input() public dataavgPrice: number[] = [];
      @Input() public changePct: number = 0;
      @Input() public last: number = 0;
      @Input() public open: number = 0;
      @Input() public symbol:string='';
      @Output() selectedpoint = new EventEmitter();
       categories: string[] = [];

  
      
      
  
      public lineStyle: SeriesLine = { width: 2, style: 'smooth', color: '#4B5FFA' };
  datas: number[];
  
          constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {
      
            
            this.getPastTRend();
            this.getCurrentPastTRend();
            this.sendPastTrend();
            this.getFallTRend();
            this.getGainTRend();

        setInterval(() => {
        this.getCurrentPastTRend()
        }, 30000);
      }
  
      // constructor() {
  
  
      // }
  ngOnInit(): void {


      const startTime = new Date(2025, 2, 23, 9, 0); // Start time: 9:07 AM
      const endTime = new Date(2025, 2, 23, 16, 0); // End time: 4:00 PM
      
      while (startTime <= endTime) {
        // Format the time as 'HH:MM'
        const hours = startTime.getHours().toString().padStart(2, '0'); // Ensure 2-digit format
        const minutes = startTime.getMinutes().toString().padStart(2, '0');
        
        this.categories.push(`${hours}:${minutes}`);
        
        // Add 1 minute to the current time
        startTime.setMinutes(startTime.getMinutes() + 1);
      }


      this.signalRBreezeService.connection.on("SendGetCurrenrPastTrend",(data :TrendModel[]) => {
        debugger;
        this.dataopen=[]
        this.bqtydataopen=[]
        this.sqtydataopen=[]
        this.ttvdataopen=[]
        const dataopen=  this.dataopen.slice(0);
        const bqtydataopen=  this.bqtydataopen.slice(0);
        const sqtydataopen=  this.sqtydataopen.slice(0);
       const ttvdataopen=this.ttvdataopen.slice(0)

        
        const lastValue = dataopen[dataopen.length - 1];
       data.forEach( (item) => {
         //const avgChange = (item.value1 + item.value2) / 2; // Calculate average
        //await this.sleep(5000);
        if (item.avg_change != lastValue) {
         dataopen.push(item.avg_change);
         bqtydataopen.push(item.avg_totalBuyQt)
         sqtydataopen.push(item.avg_totalSellQ)
         ttvdataopen.push(item.avg_ttv);
          // Push to new array
        }
       });
   
       this.dataopen=dataopen
       this.bqtydataopen=bqtydataopen
       this.sqtydataopen=sqtydataopen
       this.ttvdataopen=ttvdataopen;
      })
  }

  getPastTRend(){
    this.signalRBreezeService.connection.invoke('GetPastTrend',1)
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
   }


   getFallTRend(){
    this.signalRBreezeService.connection.invoke('GetPastTrend',3)
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
   }


   getGainTRend(){
    this.signalRBreezeService.connection.invoke('GetPastTrend',4)
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
   }
   getCurrentPastTRend(){
    this.signalRBreezeService.connection.invoke('GetCurrenrPastTrend',0)
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
   }

   sendPastTrend(){
    this.signalRBreezeService.connection.on("SendGetPastTrend",(data : TrendModel[] ) => {
      debugger;
      data.forEach((item) => {
        //const avgChange = (item.value1 + item.value2) / 2; // Calculate average
        if(item.type==3)
        {
          this.fallhigh.push(item.avg_change)
              this.bqtyfallhigh.push(item.avg_totalBuyQt)
              this.sqtyfallhigh.push(item.avg_totalSellQ)
              this.ttvfallhigh.push(item.avg_ttv)
        }
        if(item.type==4)
          {
            this.gainhigh.push(item.avg_change)
              this.bqtygainhigh.push(item.avg_totalBuyQt)
              this.sqtygainhigh.push(item.avg_totalSellQ)
              this.ttvgainhigh.push(item.avg_ttv)
          }
          if(item.type==1)
            {
              this.Lastdata.push(item.avg_change);
              this.bqtyLastdata.push(item.avg_totalBuyQt)
              this.sqtyLastdata.push(item.avg_totalSellQ)
              this.ttvLastdata.push(item.avg_ttv)
            }
         // Push to new array
      });
   // dataopen.push(data.avg_change)
    //   this.data = data1;
      //this.dataopen=data2
      
   })


   

 
  
  }

   sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  
      setpoint(symbol:string ,value : number){
        debugger;
        this.selectedpoint.emit({symbol:symbol,value:value});
      }
      public valuePlotBands: PlotBand[] = [
      {
        from: parseInt(this.open.toString()),
        to: parseInt(this.last.toString()),
        color: "#000000",
        opacity: 15,
        // label: {
        //   // // text: "Green Zone",
        //   // // font: "18px sans-serif",
        //   // color: "#444",
  
        // },
      },
    ]
      ngOnChanges(changes: any) {
  
       
  
  
      }
  
      public onRender = (args: RenderEvent): void => {
        
      };

}
