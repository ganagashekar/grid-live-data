export const environment = {
  production: true,
  // signalrHubUrl: 'https://127.0.0.1:5001/livefeedhub',
  //  //signalrHubUrl: 'https://localhost:7189/livefeedhub',
  // // signalrHubUrl: 'http://127.0.0.1:5000/livefeedhub',
  // SignalrAPISaveJson:"http://127.0.0.1:5000/WeatherForecast",
  // //signalrHubUrl:"http://localhost/StockSignalRServer/livefeedhub"

  signalrHubUrl:  document.location.protocol + "//" + document.location.hostname + ":" + 48 +"/livefeedhub",
  signalrBreezeHubUrl: document.location.protocol + "//" + document.location.hostname + ":" + 48 +"/BreezeOperation",

  // signalrHubUrl:  "http://192.168.0.106:48/livefeedhub",
  // signalrBreezeHubUrl: "http://192.168.0.106:48/BreezeOperation",
   //signalrHubUrl: 'https://localhost:7189/livefeedhub',
  // signalrHubUrl: 'http://127.0.0.1:5000/livefeedhub',
  SignalrAPISaveJson:"http://172.20.10.7:90/WeatherForecast",
  //signalrHubUrl:"http://localhost/StockSignalRServer/livefeedhub"
};
