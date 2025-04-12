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
      @Input() public CurrentData : any;
      @Input() public dataopen: number[] = [];
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

        setInterval(() => {
          // Clone the array
        //   const data= this.data.slice(0);
        //   const dataopen=  this.dataopen.slice(0);
        //  const dataavgPrice=  this.dataavgPrice.slice(0);
  
  
  
  
  
        this.getCurrentPastTRend()
  
  
         //dataopen.push(changes.CurrentData.currentValue.open);
         //dataopen.push(Math.random()+0.0002);
         //data.push(Math.random()+0.0002);
         //dataavgPrice.push(Math.random()+0.0004)


         //this.dataopen=dataopen;
         //this.data = data1;
        //  this.dataavgPrice=dataavgPrice;
          
  
          // Produce one random value each 100ms
          // data.push(Math.random()+1);
  
          // if (data.length > 10) {
          //   // Keep only 10 items in the array
          //   data.shift();
          // }
  
          // Replace with the new array instance
         // this.data = data;
        }, 30000);
      }
  
      // constructor() {
  
  
      // }
  ngOnInit(): void {
   // const data2 = [0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.408155, 0.336666, 0.796063, 0.281500, 1.232745, 0.864411, 0.456857, 0.774071, 0.462301, 0.368793, 0.442238, 0.486373, 0.582797, 0.628467, 0.724818, 0.883288, 0.791137, 0.837803, 0.913718, 1.006905, 0.893519, 1.085228, 1.090964, 1.147726, 1.109473, 1.169938, 1.450358, 1.360419, 1.336941, 1.312546, 1.307307, 0.000000, 1.442813, 1.479710, 1.545852, 1.256372, 1.454717, 1.473727, 1.432018, 1.604200, 1.569662, 1.431859, 1.458029, 1.625027, 1.613732, 1.517434, 1.480779, 1.496298, 1.391554, 1.495057, 0.000000, 1.594512, 1.595269, 1.618343, 1.593502, 1.544427, 1.659779, 1.808759, 0.000000, 1.687160, 1.535830, 1.574983, 1.635329, 1.671337, 1.661354, 1.670044, 1.638268, 1.554447, 1.515817, 1.610098, 1.600457, 1.602678, 1.693499, 1.692423, 1.743466, 1.721568, 1.773155, 1.805028, 1.817721, 1.777402, 1.736306, 1.988547, 0.000000, 1.698714, 1.564700, 1.605189, 1.631810, 1.689407, 1.629790, 1.656082, 1.677218, 1.736481, 1.721467, 1.703412, 1.795786, 1.860737, 1.886439, 1.834526, 1.906439, 1.932975, 1.807664, 1.936547, 1.937180, 1.920951, 1.696599, 1.610802, 1.727456, 1.826192, 1.650551, 1.909036, 2.112353, 1.848771, 1.744615, 1.761188, 1.935619, 1.845722, 1.701847, 1.752477, 1.827790, 1.897262, 1.724021, 1.922724, 0.000000, 1.800154, 1.743339, 1.449858, 1.442260, 1.429003, 1.669482, 1.619674, 1.622925, 1.523348, 1.505937, 1.499583, 0.000000, 1.757000, 1.669830, 1.534866, 1.486044, 1.511064, 1.518756, 0.000000, 0.000000, 1.450618, 1.498122, 1.452985, 1.383622, 1.496262, 1.430622, 1.431520, 1.451520, 1.571986, 1.654178, 1.614539, 1.570269, 1.439961, 0.000000, 1.372404, 0.000000, 1.610240, 1.663317, 1.423767, 1.826995, 1.703576, 1.615433, 1.632659, 1.658337, 1.597232, 1.403873, 1.501334, 1.474685, 1.533513, 1.469685, 1.540109, 1.854198, 0.000000, 0.000000, 1.995105, 0.000000, 1.849124, 1.704559, 1.642043, 1.480680, 1.501068, 1.714251, 1.643549, 1.538561, 1.378106, 1.595040, 1.633044, 1.911223, 1.830232, 1.729772, 1.786447, 1.722173, 1.815565, 1.626463, 1.699677, 0.000000, 1.790063, 1.816302, 1.684395, 1.121721, 1.100837, 1.470222, 1.574193, 1.502181, 1.598481, 1.587705, 1.565628, 1.625762, 1.602926, 1.826035, 1.932090, 0.000000, 0.000000, 1.440112, 1.622614, 2.068650, 2.149428, 1.602568, 1.353092, 0.000000, 0.000000, 1.896285, 1.793176, 0.000000, 0.000000, 1.873431, 1.843738, 0.000000, 1.800862, 2.091290, 1.609774, 0.000000, 2.041020, 1.758975, 1.817257, 1.730234, 0.000000, 1.534272, 1.458316, 1.614692, 1.774871, 1.677241, 1.770958, 2.015000, 1.755883, 1.624109, 1.493841, 1.423872, 1.456394, 1.409497, 1.586079, 1.615239, 1.961369, 0.000000, 1.414165, 1.428912, 1.526036, 1.499626, 1.602800, 1.697027, 1.255413, 0.000000, 1.328929, 1.222186, 0.840238, 1.526076, 1.281919, 1.442826, 0.000000, 1.290346, 1.355715, 1.443369, 1.440201, 1.231466, 0.000000, 0.000000, 0.000000, 0.000000, 1.292165, 1.213923, 1.605833, 1.382894, 1.142171, 1.438636, 1.314115, 1.196966, 0.000000, 0.000000, 0.000000, 0.000000, 1.353075, 1.288465, 0.000000, 0.000000, 1.272295, 1.378878, 1.425206, 0.000000, 0.000000, 1.525002, 1.548611, 1.471254, 1.477136, 0.000000, 0.000000, 0.000000, 2.174250, 1.730000, 1.741338, 1.698947, 1.571212, 0.000000, 1.721237, 1.557567, 1.689431, 1.612514, 0.000000, 0.000000, 2.244160, 1.389041, 1.551462, 1.618593, 1.628561, 1.759339, 0.000000, 0.000000, 0.000000, 1.643577, 1.820518, 1.910814, 1.719001, 2.059495, 2.053517, 2.184164, 1.937253, 1.522541, 1.624896, 1.775980, 0.000000, 0.000000, 0.000000, 1.884278, 1.745991, 0.000000, 1.995897, 1.599683, 1.660902, 1.763668, 1.875621, 1.785231, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 1.973478, 2.900000, 1.729585, 1.663540, 1.677043, 1.707768, 1.070000, 1.761834, 1.749238, 0.000000, 2.346686, 1.660067, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 1.845045, 1.792590, 1.779157, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000]
    //const data1 = [0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 1.359459, 0.000000, 0.000000, 3.050000, 2.244117, 1.708500, 1.308666, 1.121131, 1.207509, 1.261863, 1.286051, 1.302283, 1.412217, 1.440487, 1.384245, 0.000000, 1.527727, 1.545760, 1.545018, 1.601825, 1.435050, 1.791731, 1.769640, 1.798661, 1.765042, 1.764231, 0.000000, 0.000000, 1.557931, 1.594159, 1.546791, 1.480085, 1.382036, 1.361853, 1.356404, 1.337694, 1.260780, 1.270536, 1.325223, 1.217015, 1.121968, 1.104037, 0.000000, 0.863317, 0.804377, 0.770067, 0.772177, 0.656731, 0.704197, 0.759344, 0.751352, 0.704817, 0.722639, 0.713186, 0.736369, 0.720801, 0.709874, 0.733787, 0.772222, 0.528013, 0.249823, 0.144599, 0.046928, 0.141982, 0.000000, 0.000000, 0.242032, 0.261538, 0.230495, 0.439414, 0.000000, 0.000000, 0.384441, 0.400868, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.583146, 0.686793, 0.542553, 0.516380, 0.000000, 0.522876, 0.536560, 0.599982, 0.421252, 0.532037, 0.522720, 0.000000, 0.000000, 0.493556, 0.447888, 0.561619, 0.584819, 0.667284, 0.411159, 0.000000, 0.000000, 0.000000, 0.475871, 0.632513, 0.558133, 0.563646, 0.537011, 0.483559, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.581678, 0.667538, 0.729693, 0.599809, 0.619445, 0.821161, 0.549465, 0.698314, 0.000000, 0.555491, 0.518860, 0.606550, 0.666029, 0.000000, 0.517122, 0.552072, 0.000000, 0.000000, 0.000000, 0.000000, 0.669197, 0.000000, 0.000000, 0.000000, 0.587740, 0.588200, 0.651985, 0.817744, 0.864298, 0.847074, 0.668684, 0.000000, 0.976666, 0.621747, 0.743520, 0.812952, 0.000000, 0.000000, 0.747409, 0.000000, 0.000000, 0.555000, 0.539666, 0.809915, 0.749265, 0.834046, 0.816512, 0.718623, 0.000000, 0.748259, 0.753448, 0.775068, 0.804650, 0.537302, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.783541, 0.787696, 0.726500, 0.000000, 0.000000, 0.615353, 0.752141, 1.024161, 0.000000, 0.687270, 0.775363, 0.752366, 0.812695, 0.000000, 0.332458, 0.529446, 0.000000, 0.000000, 0.000000, 0.695253, 0.853873, 0.895436, 0.820811, 0.841010, 0.702810, 0.760356, 0.695640, 0.688149, 0.000000, 0.000000, 0.000000, 0.728893, 0.591751, 0.000000, 1.079132, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.807063, 0.000000, 0.000000, 0.000000, 0.838220, 0.773916, 0.858225, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.788938, 0.711282, 0.702658, 0.735923, 0.825939, 0.796054, 0.816411, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.590416, 0.994725, 0.423223, 0.756027, 0.000000, 0.000000, 0.831427, 0.917463, 0.519118, 0.000000, 1.021921, 0.902478, 0.000000, 0.000000, 0.895603, 0.885923, 0.000000, 0.782191, 0.793911, 0.826851, 0.807151, 0.817246, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.775034, 0.000000, 0.338947, 0.865535, 0.880935, 0.891506, 0.808143, 0.863575, 0.000000, 0.830844, 0.892036, 1.320000, 0.851351, 0.760945, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.383616, 0.000000, 0.000000, 0.646073, 0.671896, 0.000000, 0.851666, 0.867300, 0.518146, 0.000000, 0.577980, -0.078000, 0.000000, 0.000000, 0.646013, 0.617517, 0.508385, 8.000000, 0.516306, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000]

    

    // this.data = data1;
    // this.dataopen=data2
   // throw new Error('Method not implemented.');
  //  for (let i = 0; i < 500; i++) {
  //   this.data.push(Math.random() + 0.00002);
  // }

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
  }

  getPastTRend(){
    this.signalRBreezeService.connection.invoke('GetPastTrend',1)
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
   }

   getCurrentPastTRend(){
    this.signalRBreezeService.connection.invoke('GetCurrenrPastTrend',1)
        .catch((error: any) => {
          console.log(`SGetAllStocks error: ${error}`);
  
        });
   }

   sendPastTrend(){
    this.signalRBreezeService.connection.on("SendGetPastTrend",(data : TrendModel[] ) => {
      debugger;
      data.forEach((item) => {
        //const avgChange = (item.value1 + item.value2) / 2; // Calculate average
        this.Lastdata.push(item.avg_change); // Push to new array
      });
   // dataopen.push(data.avg_change)
    //   this.data = data1;
      //this.dataopen=data2
      
   })

   this.signalRBreezeService.connection.on("SendGetCurrenrPastTrend",(data :TrendModel[]) => {
     debugger;
     this.dataopen=[]
     const dataopen=  this.dataopen.slice(0);
     
     const lastValue = dataopen[dataopen.length - 1];
    data.forEach( (item) => {
      //const avgChange = (item.value1 + item.value2) / 2; // Calculate average
     //await this.sleep(5000);
     if (item.avg_change != lastValue) {
      dataopen.push(item.avg_change); // Push to new array
     }
    });

    this.dataopen=dataopen
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
  
        if(changes.CurrentData.currentValue.open < changes.CurrentData.currentValue.last){
          this.lineStyle.color="green";
        }
        else{
          this.lineStyle.color="red";
        }
  
        //const dataopen=  this.dataopen.slice(0);
        // const data= this.data.slice(0);
 //        const dataavgPrice=  this.dataavgPrice.slice(0);
  
  
  
  
  
  
  
  
        // dataopen.push(changes.CurrentData.currentValue.open);
         //dataopen.push(changes.CurrentData.currentValue.open);
         //data.push(changes.CurrentData.currentValue.last);
         //dataavgPrice.push(changes.CurrentData.currentValue.avgPrice)
        // const dataopen=  this.dataopen.slice(0);
        // dataopen.push(70.5);
        // data.push(changes.changePct.currentValue)
  
        // // Produce one random val0ue each 100ms
        // //data.push((parseFloat(Math.random().toString())));
  
        // if (data.length > 1000) {
        //   // Keep only 10 items in the array
        //   data.shift();
        // }
  
        // // Replace with the new array instance
        //this.dataopen=dataopen;
        //this.data = data;
        //this.dataavgPrice=dataavgPrice;
  
  
        //this.valuePlotBands
  
  
      }
  
      public onRender = (args: RenderEvent): void => {
        // const chart = args.sender;
  
        // // get the axes
        // const valueAxis = chart.findAxisByName("valueAxis");
        // const categoryAxis = chart.findAxisByName("categoryAxis");
  
        // // get the coordinates of the value at which the plot band will be rendered
        // const valueSlot = valueAxis.slot(this.last) as Rect;
  
        // // get the coordinates of the entire category axis range
        // const range = categoryAxis.range();
        // const categorySlot = categoryAxis.slot(
        //   range.min as number,
        //   range.max as number
        // ) as Rect;
  
        // // draw the plot band based on the found coordinates
        // const line = new Path({
        //   stroke: {
        //     color: "black",
        //     width: 0.5,
        //   },
        // })
        //   .moveTo(valueSlot.origin)
        //   .lineTo(categorySlot.topRight().x, valueSlot.origin.y);
  
        // const label = new Text( this.last.toString(), [0, 0], {
        //   fill: {
        //     color: "red",
        //   },
  
        // });
        // const bbox = label.bbox();
        // label.position([
        //   categorySlot.topRight().x - bbox.size.width,
        //   valueSlot.origin.y - bbox.size.height,
        // ]);
  
        // const group = new Group();
        // group.append(line, label);
  
        // // Draw on the Chart surface to overlay the series
        // chart.surface.draw(group);
  
        // Or as a first element in the pane to appear behind the series
        // chart.findPaneByIndex(0).visual.insert(0, group);
      };

}
