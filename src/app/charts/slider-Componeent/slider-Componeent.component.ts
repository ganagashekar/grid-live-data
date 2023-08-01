import { Component, Input, SimpleChanges } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-slider-Componeent',
  templateUrl: './slider-Componeent.component.html',
  styleUrls: ['./slider-Componeent.component.css']
})
export class SliderComponeentComponent  {
  @Input()  public currentPrice :number |any
  @Input()  public min_len :number |any
  @Input()  public max_len :number |any
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0,
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      if (value <= 70.21) {
          return 'red';
      }
      if (value <= 71.30) {
          return 'orange';
      }
      if (value <= 72.50) {
          return 'yellow';
      }
      return '#2AE02A';
    }

  };
  constructor() { }

  ngOnInit() {
    this.options.floor=this.min_len;
    this.options.ceil=this.max_len;
    this.value= this.currentPrice;
  }

  ngOnChanges(changes: any): void {
debugger;
    // this.options.floor=changes.currentValue.min_len;
    // this.options.ceil=changes.currentValue.max_len;
    this.value= changes.currentPrice.currentValue;
  }
}
