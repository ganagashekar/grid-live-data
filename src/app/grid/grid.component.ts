import { Component } from '@angular/core';
import { GridDataResult, RowClassArgs } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';
import { Stock, StocksService } from '../services/stocks.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { HttpClient } from '@angular/common/http';
import { SignalrService } from '../services/signalr.service';
import { Equities } from '../models/equities.model';

@Component({
    selector: 'grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
    animations: [
        trigger('positiveState', [
            transition('void => *', []),
            transition('* => void', []),
            transition('* => *', [
                animate(1500, keyframes([style({ backgroundColor: '#32CD32', offset: 0.0 }), style({ backgroundColor: 'inherit', offset: 1.0 })]))
            ])
        ]),
        trigger('negativeState', [
            transition('void => *', []),
            transition('* => void', []),
            transition('* => *', [
                animate(1500, keyframes([style({ backgroundColor: '#FF0000', offset: 0.0 }), style({ backgroundColor: 'inherit', offset: 1.0 })]))
            ])
        ])
    ]
})
export class GridComponent {
    public gridData: Observable<Stock[]> |any;
    public gridDataEquties: Observable<Equities[]> | any;
    public prevDataItem!: Stock;

    constructor(private stockService: StocksService,public signalRService: SignalrService, private http: HttpClient) {

      //signalRService.startConnection();
       // this.gridData = this.stockService.getDataObservable();
        // this.gridDataEquties = this.stockService.getDataObservableEquties();

       //orderBy(gridData., [{ field: "name", dir: "asc" }])
    }

    ngOnInit() {
    //  this.signalRService.startConnection();
      this.signalRService.startConnectionBuilder().build().start().then(()=> this.stockService.invokeGetEquties()).catch((err: any) => console.log('Error while starting connection: ' + err))

    //   .start().then(this.stockService.getDataObservableEquties())
    //     .catch((err: any) => console.log('Error while starting connection: ' + err))
    //  // this.gridDataEquties = this.stockService.getDataObservableEquties();

     this.signalRService.addTransferChartDataListener();
    //   //this.startHttpRequest();
    }

    // private startHttpRequest = () => {
    //   this.http.get('https://localhost:5001/api/chart')
    //     .subscribe(res => {
    //       console.log(res);
    //     })
    // }

    public sort: SortDescriptor[] = [
      {
        field: "change_24h",
        dir: "desc",
      },
    ];
    public rowCallback = (context: RowClassArgs) => {


        const previousData = this.stockService.previousData;
        const index = previousData.findIndex((item) => item.id === context.dataItem.id);
        this.prevDataItem = previousData[index];

        if (context.dataItem.change_24h > 0) {
            return { 'price-up': true };
        } else {
            return { 'price-down': true };
        }
    };
}
