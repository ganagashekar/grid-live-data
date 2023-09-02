import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSelectChange } from '@angular/material/select';
import { StocksService } from '../services/stocks.service';
import { HttpClient } from '@angular/common/http';



interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-common-filters',
  templateUrl: './common-filters.component.html',
  styleUrls: ['./common-filters.component.css']
})
export class CommonFiltersComponent implements OnInit {
  html: SafeHtml | any;
  selectedTop : number |any ;
  SelectedDate : string | any ;
  constructor(public _sanitizer: DomSanitizer,public signalRService: SignalrService, public stocksService: StocksService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  foods: Food[] = [
    {value: 'last', viewValue: 'last'},
    {value: 'close', viewValue: 'close'},
    {value: 'change', viewValue: 'change'},
    {value: 'ttv', viewValue: 'ttv'},
    {value: 'open', viewValue: 'open'},

  ];

  selected(event: MatSelectChange) {
    debugger;

    this.selectedTop=event;
    this.signalRService.connection
              .invoke('GetPivotData',this.SelectedDate,this.selectedTop)
              .catch((error: any) => {
                console.log(`SGetAllStocks error: ${error}`);
                alert('GetAllStocks error!, see console for details.');
          });

  }

   onDateChange(event: any ): void {
    debugger;
    this.SelectedDate = event.value.toUTCString();
    this.signalRService.connection
              .invoke('GetPivotData',this.SelectedDate,this.selectedTop)
              .catch((error: any) => {
                console.log(`SGetAllStocks error: ${error}`);
                alert('GetAllStocks error!, see console for details.');
          });
  }
}
