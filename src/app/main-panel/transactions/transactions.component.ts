import { Component } from '@angular/core';
import { Transactions } from 'src/app/models/transaction.model';
import { accountTransactions } from '../transaction-data/transactions';
import { SignalrService } from 'src/app/services/signalr.service';
import { StocksService } from 'src/app/services/stocks.service';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
    public transactionCards: Transactions[] = accountTransactions;

    public getCardImg(card: Transactions): string {
        return `assets/coinslogo/${card.currency}.png`;
    }

    constructor(public signalRService: SignalrService, public stocksService: StocksService, private http: HttpClient) {

      this.signalRService.connection
      .invoke('GetAllStocks')
      .catch((error: any) => {
        console.log(`SGetAllStocks error: ${error}`);
        alert('GetAllStocks error!, see console for details.');
      });
    }
}
