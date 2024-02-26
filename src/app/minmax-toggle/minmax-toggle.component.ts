import { async } from '@angular/core/testing';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-minmax-toggle',
  templateUrl: './minmax-toggle.component.html',
  styleUrls: ['./minmax-toggle.component.css'],
})
export class MinmaxToggleComponent implements OnInit {

  @Input() pr_change :string;
  @Input() pr_close  :string;
  @Input() pr_open  :string;
  @Input() pr_volume  :string;
  @Input() pr_date :string;

  @Input() pr_Macresult :string;
  @Input() pr_RSI :string;
  @Input() pr_Match :string;
  @Input() anchor: any;
   toggleText: string = "Hide";
   show: boolean = false;

  public onToggle(el:any): void {debugger;
    this.anchor = el;
    this.show = !this.show;
    this.toggleText = this.show ? "Hidе" : "Show";
  }
  constructor() {}

  ngOnInit() {}

  carDateCalculator(val :any){
    return parseInt(val) > 0 ? true:false;

  }



  public close(): void {
    this.show = false;
  }
}
