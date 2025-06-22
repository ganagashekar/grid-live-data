import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { kendochartModel } from '../models/kendochartmodel';
import { SeriesLine, SeriesNotes } from '@progress/kendo-angular-charts';
import { StocksService } from '../services/stocks.service';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from '../services/signalr.service';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';
import { NIFTYPCR_OiData } from '../models/NIFTYPCRModel';
import { NiftyTraderVIX } from '../models/niftyVix';
import { NiftyOptionPnL } from '../models/NiftyOptiondata';
import { min } from 'rxjs';

@Component({
  selector: 'app-niftyoptions',
  templateUrl: './niftyoptions.component.html',
  styleUrls: ['./niftyoptions.component.css']
})
export class NiftyoptionsComponent implements OnInit {


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
  
  
  setInterval(() => {
  this.getNiftyData()
  }, 5000);
  }
  
  
  
  ngOnInit(): void {
  
    
  
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
debugger;
        this.ltt=ltt
        this.niftyce_pnl=niftyce_pnl
        this.niftype_pnl=niftype_pnl
        this.nifty_strikePrice=nifty_strikePrice;
        this.nifty_avgprice_diff=nifty_avgprice_diff
       
    
    })
  
  

  
  
     this.signalRBreezeService.connection.on("SendGetNiftyPCR",(data :NiftyOptionPnL[]) => {
  debugger;
    //   this.niftychg=[]
    //   this.niftypcr=[]
    //   this.ltt=[];
    //   const niftychg=  this.niftychg.slice(0);
    //   const niftypcr=  this.niftypcr.slice(0);
    //   const ltt=this.ltt.slice(0);
  
      
  
      
      
    //  data.forEach( (item) => {
    //     niftychg.push({ value: item.callPnL, extremum: "" });
    //     niftypcr.push({ value: item.putPnL, extremum: "Buy" })
    //     ltt.push(item.lTT)
    //  });
     
    //  this.niftychg=niftychg
    //  this.niftypcr=niftypcr
    //  this.ltt=ltt
  
    //   const niftyChgValues = this.niftychg.map(item => item.value);
    //   const niftypcrValues = this.niftypcr.map(item => item.value);
    //   this.niftymin = Math.min(...niftypcrValues);
    //   this.niftymax = Math.max(...niftypcrValues);
  
  
    //   this.bniftymin = Math.min(...niftyChgValues);
    //   this.bniftymax = Math.max(...niftyChgValues);
   
  
  
    })
     
  }
  
  getNiftyData(){
  
    this.signalRBreezeService.connection.invoke('GetNiftyPNL')
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
  
  
  