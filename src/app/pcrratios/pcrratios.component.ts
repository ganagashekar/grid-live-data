import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SeriesLine } from '@progress/kendo-angular-charts';
import { SignalrBreezeService } from '../services/signalr.serviceBreeze';
import { SignalrService } from '../services/signalr.service';
import { StocksService } from '../services/stocks.service';
import { HttpClient } from '@angular/common/http';
import { NIFTYPCR_OiData } from '../models/NIFTYPCRModel';

@Component({
selector: 'app-pcrratios',
templateUrl: './pcrratios.component.html',
styleUrls: ['./pcrratios.component.css']
})
export class PcrratiosComponent implements OnInit {

@ViewChild('container', { read: ViewContainerRef, static: true })
public popupContainer: ViewContainerRef | undefined;
// @Input() public chartdata : Observable<number[]> | undefined;
@Input() public niftypcr: number[] = [];
@Input() public niftychg: number[] = [];
@Input() public ltt: string[] = [];
@Input() niftymin=0;
@Input() niftymax=0;
@Output() selectedpoint = new EventEmitter();
public lineStyle: SeriesLine = { width: 2, style: 'smooth', color: '#4B5FFA' };

constructor(public signalRService: SignalrService, public signalRBreezeService: SignalrBreezeService,public stocksService: StocksService, private http: HttpClient) {

this.getNiftyData();


setInterval(() => {
this.getNiftyData()
}, 30000);
}

ngOnInit(): void {

   this.signalRBreezeService.connection.on("SendGetNiftyPCR",(data :NIFTYPCR_OiData[]) => {

    this.niftychg=[]
    this.niftypcr=[]
    this.ltt=[];
    const niftychg=  this.niftychg.slice(0);
    const niftypcr=  this.niftypcr.slice(0);
    const ltt=this.ltt.slice(0);

    

    
    //const lastValue = dataopen[dataopen.length - 1];
   data.forEach( (item) => {
     //const avgChange = (item.value1 + item.value2) / 2; // Calculate average
    //await this.sleep(5000);
    // if (item.avg_change != lastValue) {
      niftychg.push(item.index_close);
      niftypcr.push(item.pcr)
      ltt.push(item.time)
      // Push to new array
   // }
   });


   const minValue = Math.min(...niftypcr);
   const maxValue = Math.max(...niftypcr);
   this.niftymin=minValue;
   this.niftymax=maxValue;

   this.niftychg=niftychg
   this.niftypcr=niftypcr
   this.ltt=ltt

  })
   
}

getNiftyData(){

  this.signalRBreezeService.connection.invoke('GetNiftyPCR')
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
}

setpoint(symbol:string ,value : number){
  debugger;
  this.selectedpoint.emit({symbol:symbol,value:value});
}

}
