import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { kendochartModel } from '../models/kendochartmodel';
import { SeriesLine, SeriesNotes } from '@progress/kendo-angular-charts';
import { StocksService } from '../services/stocks.service';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from '../services/signalr.service';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';
import { NIFTYPCR_OiData } from '../models/NIFTYPCRModel';
import { NiftyTraderVIX } from '../models/niftyVix';
import { IntersectionData, NiftyOptionPnL } from '../models/NiftyOptiondata';
import { min } from 'rxjs';

@Component({
  selector: 'app-niftyoptions',
  templateUrl: './niftyoptions.component.html',
  styleUrls: ['./niftyoptions.component.css']
})


export class NiftyoptionsComponent implements OnInit,OnChanges  {


  @ViewChild('container', { read: ViewContainerRef, static: true })
  public popupContainer: ViewContainerRef | undefined;

  @Input() public ltt: string[] = [];

  public crossingValues: number[] = [0, 15000];
  public notes: SeriesNotes = {
    label: {
      position: "outside",
    },
    line: {
      length: 5,
    },
    icon: {
      type: "square",
    },
    position: "bottom",
  };
  
  public intersectionPoints: IntersectionData[] = [];

  // Define a custom event to emit when an intersection is detected
  @Output() intersectionDetected = new EventEmitter<IntersectionData>();

  
  @Input() public Day1_niftyce_pnl: number[] = [];
  @Input() public Day1_niftype_pnl: number[] = [];
  @Input() public Day1_nifty_avgprice_diff: number[] = [];
  @Input() public Day1_nifty_strikePrice: number[] = [];

  @Input() public Day2_niftyce_pnl: number[] = [];
  @Input() public Day2_niftype_pnl: number[] = [];
  @Input() public Day2_nifty_avgprice_diff: number[] = [];
  @Input() public Day2_nifty_strikePrice: number[] = [];


  
  @Input() public niftyce_pnl: number[] = [];
  @Input() public niftype_pnl: number[] = [];
  @Input() public nifty_avgprice_diff: number[] = [];
  @Input() public nifty_strikePrice: number[] = [];

  @Input() public bnkltt: string[] = [];
  @Input() niftyce_pnl_min=0;
  @Input() niftyce_pnlmax=0;
  
  @Input() niftype_pnlmin=0;
  @Input() niftype_pnlmax=0;

  @Input() nifty_avgprice_min=0;
  @Input() nifty_avgprice_max=0;
  
  @Input() nifty_strikePricemin=0;
  @Input() nifty_strikePricemax=0;

  @Input() ltt_min='';
  @Input() ltt_max='';
  
  @Output() selectedpoint = new EventEmitter();
  public lineStyle: SeriesLine = { width: 30, style: 'smooth', color: '#4B5FFA' };
  
  constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {
  
  this.getNiftyData();
  this.GetPastNiftyPNL();
  
  
  setInterval(() => {
  this.getNiftyData()
//  // if ((changes['niftyce_pnl'] || changes['niftype_pnl'] || changes['ltt']) && this.niftyce_pnl.length > 0) {
//       this.processIntersectionPoints();
//    // }
  }, 5000);
  }
  
  private processIntersectionPoints(): void {
    debugger;
    const intersections: IntersectionData[] = [];

    // Ensure all required arrays are available, non-empty, and have compatible lengths
    if (!this.niftyce_pnl || !this.niftype_pnl || !this.ltt || !this.niftyce_pnl || 
        this.niftyce_pnl.length === 0 || this.niftype_pnl.length === 0 || this.ltt.length === 0 || this.niftyce_pnl.length === 0 ||
        this.niftyce_pnl.length !== this.niftyce_pnl.length || this.niftype_pnl.length !== this.niftyce_pnl.length || this.ltt.length !== this.niftyce_pnl.length) {
        console.warn('PnL data, LTT data, or chart data not ready/compatible for intersection calculation. Skipping.');
        this.intersectionPoints = []; // Clear previous intersections if data is not ready
        return;
    }

    for (let i = 1; i < this.niftyce_pnl.length; i++) { // Iterate using chartData length as reference
      // Use PnL values from the input arrays for intersection calculation
      const prevCallPnl = this.niftyce_pnl[i - 1];
      const currCallPnl = this.niftyce_pnl[i];
      const prevPutPnl = this.niftype_pnl[i - 1];
      const currPutPnl = this.niftype_pnl[i];

      // Use DateTime from the LTT input array for the time axis
      const prevDateTime = new Date(this.ltt[i - 1]);
      const currDateTime = new Date(this.ltt[i]);

      // Check for crossover based on PnL values
      if ((prevCallPnl < prevPutPnl && currCallPnl > currPutPnl) ||
          (prevCallPnl > prevPutPnl && currCallPnl < currPutPnl)) {
          
          // Precise linear interpolation for intersection point
          // Calculate relative position (t) between prev and curr points where intersection occurs
          const t = (prevPutPnl - prevCallPnl) /
                    ((currCallPnl - prevCallPnl) - (currPutPnl - prevPutPnl));
          
          // Interpolate DateTime for the exact intersection point
          const intersectionDateTime = new Date(
              prevDateTime.getTime() + t * (currDateTime.getTime() - prevDateTime.getTime())
          );

          // Interpolate Value (PnL) for the exact intersection point
          const intersectionY = prevCallPnl + t * (currCallPnl - prevCallPnl);

          const intersectionDetail: IntersectionData = {
              dateTime: intersectionDateTime,
              value: intersectionY,
              direction: (currCallPnl > currPutPnl) ? "Call PnL Crosses Above Put PnL" : "Call PnL Crosses Below Put PnL"
          };

          intersections.push(intersectionDetail);
          
          // Emit the custom event when an intersection is detected
          this.intersectionDetected.emit(intersectionDetail);
      }
    }
    this.intersectionPoints = intersections;
  }

    ngOnChanges(changes: SimpleChanges): void {
    // Re-process intersections if PnL or LTT inputs change AND chartData is already available
    if ((changes['niftyce_pnl'] || changes['niftype_pnl'] || changes['ltt']) && this.niftyce_pnl.length > 0) {
      this.processIntersectionPoints();
    }
  }
  
  ngOnInit(): void {
  
    

    this.signalRBreezeService.connection.on("SendGetPastNiftyPNL",(data :NiftyOptionPnL[]) => {
    debugger;
     if(data[0].day==1){
      this.Day1_niftyce_pnl=[]
      this.Day1_niftype_pnl=[]
      
      this.Day1_nifty_avgprice_diff=[];
      this.Day1_nifty_strikePrice=[];

      const niftyce_pnl=  this.Day1_niftyce_pnl.slice(0);
      const niftype_pnl=  this.Day1_niftype_pnl.slice(0);
      const nifty_avgprice_diff=  this.Day1_nifty_avgprice_diff.slice(0);
      const nifty_strikePrice=  this.Day1_nifty_strikePrice.slice(0);


      
  
     data.forEach( (item) => {
        niftyce_pnl.push(item.callPnL);
        niftype_pnl.push(item.putPnL);
        nifty_avgprice_diff.push(item.avgPrice);
        nifty_strikePrice.push(item.spotPrice);
      //  ltt.push(item.ltt)
     });
  
  
        //this.ltt=ltt
        this.Day1_niftyce_pnl=niftyce_pnl
        this.Day1_niftype_pnl=niftype_pnl
        this.Day1_nifty_strikePrice=nifty_strikePrice;
        this.Day1_nifty_avgprice_diff=nifty_avgprice_diff
    }


    })
  
    this.signalRBreezeService.connection.on("SendGetNiftyPNL",(data :NiftyOptionPnL[]) => {
    
      this.niftyce_pnl=[]
      this.niftype_pnl=[]
      this.ltt=[];
      this.nifty_avgprice_diff=[];
      this.nifty_strikePrice=[];

      const niftyce_pnl=  this.niftyce_pnl.slice(0);
      const niftype_pnl=  this.niftype_pnl.slice(0);
      const nifty_avgprice_diff=  this.nifty_avgprice_diff.slice(0);
      const nifty_strikePrice=  this.nifty_strikePrice.slice(0);


      const ltt=this.ltt.slice(0);
  
     data.forEach( (item) => {
        niftyce_pnl.push(item.callPnL);
        niftype_pnl.push(item.putPnL);
        nifty_avgprice_diff.push(item.avgPrice);
        nifty_strikePrice.push(item.spotPrice);
        ltt.push(item.ltt)
     });
  
  
     const ce_minValue = Math.min(...niftyce_pnl);
     const ce_maxValue = Math.max(...niftyce_pnl);

     const pe_minValue = Math.min(...niftype_pnl);
     const pe_maxValue = Math.max(...niftype_pnl);

     const avg_minValue = Math.min(...nifty_avgprice_diff);
     const avg_maxValue = Math.max(...nifty_avgprice_diff);
  
     const spot_minValue = Math.min(...nifty_strikePrice);
     const spot_maxValue = Math.max(...nifty_strikePrice);
     

     const ltt_minValue = new Date(Math.min(...ltt.map(date => new Date(date).getTime())));
     const ltt_maxValue = new Date(Math.max(...ltt.map(date => new Date(date).getTime())));
  
     this.niftyce_pnl_min=ce_minValue;
     this.niftyce_pnlmax=ce_maxValue;

     this.niftype_pnlmin=pe_minValue;
     this.niftype_pnlmax=pe_maxValue;

     this.nifty_avgprice_min=avg_minValue;
     this.nifty_avgprice_max=avg_maxValue;


     this.nifty_strikePricemin=spot_minValue
     this.nifty_strikePricemax=spot_maxValue
        this.ltt=ltt
        this.niftyce_pnl=niftyce_pnl
        this.niftype_pnl=niftype_pnl
        this.nifty_strikePrice=nifty_strikePrice;
        this.nifty_avgprice_diff=nifty_avgprice_diff
       
    
    })
  
  

  
  
     this.signalRBreezeService.connection.on("SendGetNiftyPCR",(data :NiftyOptionPnL[]) => {
  debugger;
    
  
    })
     
  }
  
  getNiftyData(){
   this.processIntersectionPoints();
    this.signalRBreezeService.connection.invoke('GetNiftyPNL')
          .catch((error: any) => {
            console.log(`SGetAllStocks error: ${error}`);
    
          });
  
  
  }
  GetPastNiftyPNL(){
  
    this.signalRBreezeService.connection.invoke('GetPastNiftyPNL',1)
          .catch((error: any) => {
            console.log(`SGetAllStocks error: ${error}`);
    
          });
  
  
  }
  setpoint(symbol:string ,value : number){
    //debugger;
  //  this.selectedpoint.emit({symbol:symbol,value:value});
  }
  
  ImportPCR(){
    this.signalRBreezeService.connection.invoke('UpdatePCR')
          .catch((error: any) => {
            console.log(`SGetAllStocks error: ${error}`);
    
          });
  
    
  }
  
  }
  
  
  