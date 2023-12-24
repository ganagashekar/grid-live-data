import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minmax-toggle',
  templateUrl: './minmax-toggle.component.html',
  styleUrls: ['./minmax-toggle.component.css']
})
export class MinmaxToggleComponent implements OnInit {

  valuemin=0;
  valuemax=0;

  // options: Options = {
  //   floor: 0,
  //   ceil: 5000,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         return "<b>Min:</b>" + value;
  //       case LabelType.High:
  //         return "<b>Max:</b>" + value;
  //       default:
  //         return  value;
  //     }
  //   }
  // };
  constructor() { }

  ngOnInit(): void {
  }

  // sliderEvent(value: any) {
  //   alert(this.minValue);
  // }
}
