import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PlotBand, SeriesLine } from '@progress/kendo-angular-charts';
import { Observable } from 'rxjs';
import { Path, Group, Text } from "@progress/kendo-drawing";
import { Rect } from "@progress/kendo-drawing/geometry";
import { RenderEvent } from "@progress/kendo-angular-charts";

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
      @Input() public data: number[] = [];
      @Input() public CurrentData : any;
      @Input() public dataopen: number[] = [];
      @Input() public dataavgPrice: number[] = [];
      @Input() public changePct: number = 0;
      @Input() public last: number = 0;
      @Input() public open: number = 0;
      @Input() public symbol:string='';
      @Output() selectedpoint = new EventEmitter();
      public categories: Date[] = []; // Time (HH:mm)
  
  
      public lineStyle: SeriesLine = { width: 2, style: 'normal', color: '#4B5FFA' };
  
      constructor() {

       

        const data1 = [1.359459, 3.050000, 2.244117, 1.708500, 1.308666, 1.121131, 1.207509, 1.261863, 1.286051, 1.302283, 1.412217, 1.440487, 1.384245, 1.527727, 1.545760, 1.545018, 1.601825, 1.435050, 1.791731, 1.769640, 1.798661, 1.765042, 1.764231, 1.557931, 1.594159, 1.546791, 1.480085, 1.382036, 1.361853, 1.356404, 1.337694, 1.260780, 1.270536, 1.325223, 1.217015, 1.121968, 1.104037, 0.863317, 0.804377, 0.770067, 0.772177, 0.656731, 0.704197, 0.759344, 0.751352, 0.704817, 0.722639, 0.713186, 0.736369, 0.720801, 0.709874, 0.733787, 0.772222, 0.528013, 0.249823, 0.144599, 0.046928, 0.141982, 0.242032, 0.261538, 0.230495, 0.439414, 0.384441, 0.400868, 0.583146, 0.686793, 0.542553, 0.516380, 0.522876, 0.536560, 0.599982, 0.421252, 0.532037, 0.522720, 0.493556, 0.447888, 0.561619, 0.584819, 0.667284, 0.411159, 0.475871, 0.632513, 0.558133, 0.563646, 0.537011, 0.483559, 0.581678, 0.667538, 0.729693, 0.599809, 0.619445, 0.821161, 0.549465, 0.698314, 0.555491, 0.518860, 0.606550, 0.666029, 0.517122, 0.552072, 0.669197, 0.587740, 0.588200, 0.651985, 0.817744, 0.864298, 0.847074, 0.668684, 0.976666, 0.621747, 0.743520, 0.812952, 0.747409, 0.555000, 0.539666, 0.809915, 0.749265, 0.834046, 0.816512, 0.718623, 0.748259, 0.753448, 0.775068, 0.804650, 0.537302, 0.783541, 0.787696, 0.726500, 0.615353, 0.752141, 1.024161, 0.687270, 0.775363, 0.752366, 0.812695, 0.332458, 0.529446, 0.695253, 0.853873, 0.895436, 0.820811, 0.841010, 0.702810, 0.760356, 0.695640, 0.688149, 0.728893, 0.591751, 1.079132, 0.807063, 0.838220, 0.773916, 0.858225, 0.788938, 0.711282, 0.702658, 0.735923, 0.825939, 0.796054, 0.816411, 0.590416, 0.994725, 0.423223, 0.756027, 0.831427, 0.917463, 0.519118, 1.021921, 0.902478, 0.895603, 0.885923, 0.782191, 0.793911, 0.826851, 0.807151, 0.817246, 0.775034, 0.338947, 0.865535, 0.880935, 0.891506, 0.808143, 0.863575, 0.830844, 0.892036, 1.320000, 0.851351, 0.760945, 0.383616, 0.646073, 0.671896, 0.851666, 0.867300, 0.518146, 0.577980, -0.078000, 0.646013, 0.617517, 0.508385, 8.000000, 0.516306]
        setInterval(() => {
          // Clone the array
          const data= this.data.slice(0);
          const dataopen=  this.dataopen.slice(0);
         const dataavgPrice=  this.dataavgPrice.slice(0);
  
  
  
  
  
  
  
  
         //dataopen.push(changes.CurrentData.currentValue.open);
        // dataopen.push(Math.random()+0.0002);
         //data.push(Math.random()+0.0002);
         //dataavgPrice.push(Math.random()+0.0004)


         //this.dataopen=dataopen;
         this.data = data1;
        //  this.dataavgPrice=dataavgPrice;
          
  
          // Produce one random value each 100ms
          // data.push(Math.random()+1);
  
          // if (data.length > 10) {
          //   // Keep only 10 items in the array
          //   data.shift();
          // }
  
          // Replace with the new array instance
         // this.data = data;
        }, 100);
      }
  
      // constructor() {
  
  
      // }
  ngOnInit(): void {

    const start = new Date(2025, 2, 23, 9, 0); // Start time: 9:00 AM
    const end = new Date(2025, 2, 23, 16, 0); // End time: 4:00 PM

    let current = new Date(start);
    while (current <= end) {
      this.categories.push(new Date(current)); // Add time as category
     // Add random data for demonstration
      current.setMinutes(current.getMinutes() + 1); // Increment time by 1 minute
    }


   // throw new Error('Method not implemented.');
   for (let i = 0; i < 500; i++) {
    this.data.push(Math.random() + 0.00002);
  }
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
  
        const dataopen=  this.dataopen.slice(0);
         const data= this.data.slice(0);
         const dataavgPrice=  this.dataavgPrice.slice(0);
  
  
  
  
  
  
  
  
        // dataopen.push(changes.CurrentData.currentValue.open);
         dataopen.push(changes.CurrentData.currentValue.open);
         data.push(changes.CurrentData.currentValue.last);
         dataavgPrice.push(changes.CurrentData.currentValue.avgPrice)
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
        this.dataopen=dataopen;
        this.data = data;
        this.dataavgPrice=dataavgPrice;
  
  
        this.valuePlotBands
  
  
      }
  
      public onRender = (args: RenderEvent): void => {
        const chart = args.sender;
  
        // get the axes
        const valueAxis = chart.findAxisByName("valueAxis");
        const categoryAxis = chart.findAxisByName("categoryAxis");
  
        // get the coordinates of the value at which the plot band will be rendered
        const valueSlot = valueAxis.slot(this.last) as Rect;
  
        // get the coordinates of the entire category axis range
        const range = categoryAxis.range();
        const categorySlot = categoryAxis.slot(
          range.min as number,
          range.max as number
        ) as Rect;
  
        // draw the plot band based on the found coordinates
        const line = new Path({
          stroke: {
            color: "black",
            width: 0.5,
          },
        })
          .moveTo(valueSlot.origin)
          .lineTo(categorySlot.topRight().x, valueSlot.origin.y);
  
        const label = new Text( this.last.toString(), [0, 0], {
          fill: {
            color: "red",
          },
  
        });
        const bbox = label.bbox();
        label.position([
          categorySlot.topRight().x - bbox.size.width,
          valueSlot.origin.y - bbox.size.height,
        ]);
  
        const group = new Group();
        group.append(line, label);
  
        // Draw on the Chart surface to overlay the series
        chart.surface.draw(group);
  
        // Or as a first element in the pane to appear behind the series
        // chart.findPaneByIndex(0).visual.insert(0, group);
      };

}
