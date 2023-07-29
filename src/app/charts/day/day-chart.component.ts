import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'day-chart',
    templateUrl: './day-chart.template.html'
})
export class DayChartComponent {
  // @Input() public chartdata : Observable<number[]> | undefined;
    @Input() public data: number[] = [];
    @Input() public changePct: number = 0;

    // constructor() {
    //   setInterval(() => {
    //     // Clone the array
    //     const data= this.data.slice(0);

    //     // Produce one random value each 100ms
    //     data.push(Math.random()+1);

    //     // if (data.length > 10) {
    //     //   // Keep only 10 items in the array
    //     //   data.shift();
    //     // }

    //     // Replace with the new array instance
    //     this.data = data;
    //   }, 100);
    // }

    constructor() {
      setInterval(() => {
        // Clone the array
        // const data= this.data.slice(0);

        // // Produce one random value each 100ms
        // data.push(Math.random()+1);

        // // if (data.length > 10) {
        // //   // Keep only 10 items in the array
        // //   data.shift();
        // // }

        // // Replace with the new array instance
        // this.data = data;
      }, 100);
    }

    ngOnChanges(changes: any) {
      console.log('changes', changes);

      const data= this.data.slice(0);

      // Produce one random value each 100ms
      data.push(Math.random()+1);

      // if (data.length > 10) {
      //   // Keep only 10 items in the array
      //   data.shift();
      // }

      // Replace with the new array instance
      this.data = data;


    }
}

