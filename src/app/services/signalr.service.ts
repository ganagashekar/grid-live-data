import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class SignalrService {


  private hubConnection: signalR.HubConnection | any
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              //.withUrl('https://localhost:7189/livefeedhub')
                              .withUrl("https://localhost:7189/livefeedhub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch((err: any) => console.log('Error while starting connection: ' + err))
    }

    public addTransferChartDataListener = () => {

      this.hubConnection.on('SendLiveData', (data: any) => {

        console.log(data);
      });
    }
}
