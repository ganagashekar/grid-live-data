import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Series, SeriesLine, SeriesNotes, ValueAxis } from '@progress/kendo-angular-charts';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';
import { SignalrService } from '../services/signalr.service';
import { StocksService } from '../services/stocks.service';
import { HttpClient } from '@angular/common/http';
import { NIFTYPCR_OiData } from '../models/NIFTYPCRModel';
import { kendochartModel } from '../models/kendochartmodel';
import { NiftyTraderVIX } from '../models/niftyVix';

@Component({
selector: 'app-pcrratios',
templateUrl: './pcrratios.component.html',
styleUrls: ['./pcrratios.component.css']
})
export class PcrratiosComponent implements OnInit {

@ViewChild('container', { read: ViewContainerRef, static: true })
public popupContainer: ViewContainerRef | undefined;
// @Input() public chartdata : Observable<number[]> | undefined;
@Input() public niftypcr: kendochartModel[] = [];
@Input() public niftychg:kendochartModel[] = [];
@Input() public ltt: string[] = [];
@Input() niftymin=0;
@Input() niftymax=0;

@Input() bniftymin=0;
@Input() bniftymax=0;
public crossingValues: number[] = [0, 2000];
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

@Input() public niftyvix: number[] = [];
@Input() public niftyvixltt: string[] = [];
@Input() Vixymin=0;
@Input() Vixmax=0;



@Input() public bnkniftypcr: number[] = [];
@Input() public bnkniftychg: number[] = [];
@Input() public bnkltt: string[] = [];
@Input() bnkniftymin=0;
@Input() bnkniftymax=0;

@Input() bnkbniftymin=0;
@Input() bnkbniftymax=0;

@Output() selectedpoint = new EventEmitter();
public lineStyle: SeriesLine = { width: 30, style: 'smooth', color: '#4B5FFA' };

constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {

this.getNiftyData();


setInterval(() => {
this.getNiftyData()
}, 30000);
}



ngOnInit(): void {

  

  this.signalRBreezeService.connection.on("SendBankNiftyPCR",(data :NIFTYPCR_OiData[]) => {
  
    this.bnkniftychg=[]
    this.bnkniftypcr=[]
    this.bnkltt=[];
    const bnkniftychg=  this.bnkniftychg.slice(0);
    const bnkniftypcr=  this.bnkniftypcr.slice(0);
    const bnkltt=this.ltt.slice(0);

   data.forEach( (item) => {
      bnkniftychg.push(item.index_close);
      bnkniftypcr.push(item.pcr)
      bnkltt.push(item.time)
   });


   const minValue = Math.min(...bnkniftypcr);
   const maxValue = Math.max(...bnkniftypcr);

   const bminValue = Math.min(...bnkniftychg);
   const bmaxValue = Math.max(...bnkniftychg);

   this.bnkniftymin=minValue;
   this.bnkniftymax=maxValue;
   this.bnkbniftymax=bmaxValue;
   this.bnkbniftymin=bminValue

   this.bnkniftychg=bnkniftychg
   this.bnkniftypcr=bnkniftypcr
   this.bnkltt=bnkltt
  
  })


  this.signalRBreezeService.connection.on("SendGetIndiaVIXPCR",(data :NiftyTraderVIX) => {
    debugger;

    this.Vixymin = Math.min(...data.chart_datas);
    this.Vixmax = Math.max(...data.chart_datas);

    this.niftyvix=data.chart_datas;
    this.niftyvixltt=data.chart_times;
  })


   this.signalRBreezeService.connection.on("SendGetNiftyPCR",(data :NIFTYPCR_OiData[]) => {
debugger;
    this.niftychg=[]
    this.niftypcr=[]
    this.ltt=[];
    const niftychg=  this.niftychg.slice(0);
    const niftypcr=  this.niftypcr.slice(0);
    const ltt=this.ltt.slice(0);

    

    
    
   data.forEach( (item) => {
      niftychg.push({ value: item.index_close, extremum: "" });
      niftypcr.push({ value: item.pcr, extremum: "Buy" })
      ltt.push(item.time)
   });
   
   this.niftychg=niftychg
   this.niftypcr=niftypcr
   this.ltt=ltt

    const niftyChgValues = this.niftychg.map(item => item.value);
    const niftypcrValues = this.niftypcr.map(item => item.value);
    this.niftymin = Math.min(...niftypcrValues);
    this.niftymax = Math.max(...niftypcrValues);


    this.bniftymin = Math.min(...niftyChgValues);
    this.bniftymax = Math.max(...niftyChgValues);
 


  })
   
}

getNiftyData(){

  this.signalRBreezeService.connection.invoke('GetNiftyPCR')
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });

  this.signalRBreezeService.connection.invoke('GetBankNiftyPCR')
  .catch((error: any) => {
    console.log(`SGetAllStocks error: ${error}`);

  });


  this.signalRBreezeService.connection.invoke('GetIndiaVIXPCR')
  .catch((error: any) => {
    console.log(`SGetAllStocks error: ${error}`);

  });
}

setpoint(symbol:string ,value : number){
  debugger;
  this.selectedpoint.emit({symbol:symbol,value:value});
}

ImportPCR(){
  this.signalRBreezeService.connection.invoke('UpdatePCR')
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });

  
}

}


