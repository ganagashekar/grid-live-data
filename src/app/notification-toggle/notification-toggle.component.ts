import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-toggle',
  templateUrl: './notification-toggle.component.html',
  styleUrls: ['./notification-toggle.component.css']
})
export class NotificationToggleComponent implements OnInit {


  @Input() symbol: string ="";
  @Input() displaytext: string | undefined ;
  @Input() savedtext: string | undefined ;
  @Input() valuetext:string | undefined ;
  @Input() bgcolor : string="";
  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    debugger;
    this.selected=(this.savedtext==this.valuetext);
  }

  public toggleSelected() {
    debugger;
    this.selected = !this.selected;
    this.selectedChange.emit({symbol:this.symbol,value:  this.selected ? this.savedtext : ''});
  }

  // @Input() selectedCHG_06: boolean = false;
  // @Input() selectedCHG_1: boolean = false;
  // @Input() selectedCHG_2: boolean = false;
  // @Input() selectedCHG_3: boolean = false;
  // @Input() selectedCHG_4: boolean = false;
  // @Input() selectedCHG_5: boolean = false;
  // @Input() selectedCHG_6: boolean = false;

  // @Output() selectedChange_06 = new EventEmitter();
  // @Output() selectedChange_1 = new EventEmitter();
  // @Output() selectedChange_2 = new EventEmitter();
  // @Output() selectedChange_3 = new EventEmitter();
  // @Output() selectedChange_4 = new EventEmitter();
  // @Output() selectedChange_5 = new EventEmitter();
  // @Output() selectedChange_6 = new EventEmitter();


  // @Input() symbol: string ="";

  // constructor() { }

  // ngOnInit() {
  // }


  // public toggleSelected_06() {
  //   debugger;
  //   this.selectedCHG_1 = !this.selectedCHG_1;
  //   this.selectedChange_06.emit({msnid:this.symbol,selected:this.selectedCHG_06});
  // }


  // public toggleSelected_2() {
  //   debugger;
  //   this.selectedCHG_2 = !this.selectedCHG_2;
  //   this.selectedChange_2.emit({msnid:this.symbol,selected:this.selectedCHG_2});
  // }



  // public toggleSelected_3() {
  //   debugger;
  //   this.selectedCHG_3 = !this.selectedCHG_1;
  //   this.selectedChange_3.emit({msnid:this.symbol,selected:this.selectedCHG_3});
  // }



  // public toggleSelected_4() {
  //   debugger;
  //   this.selectedCHG_4 = !this.selectedCHG_4;
  //   this.selectedChange_4.emit({msnid:this.symbol,selected:this.selectedCHG_4});
  // }



  // public toggleSelected_5() {
  //   debugger;
  //   this.selectedCHG_5 = !this.selectedCHG_5;
  //   this.selectedChange_5.emit({msnid:this.symbol,selected:this.selectedCHG_5});
  // }



  // public toggleSelected_6() {
  //   debugger;
  //   this.selectedCHG_6 = !this.selectedCHG_6;
  //   this.selectedChange_6.emit({msnid:this.symbol,selected:this.selectedCHG_1});
  // }



  // public toggleSelected_1() {
  //   debugger;
  //   this.selectedCHG_1 = !this.selectedCHG_1;
  //   this.selectedChange_1.emit({msnid:this.symbol,selected:this.selectedCHG_1});
  // }



}
