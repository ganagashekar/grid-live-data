import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-niftytrader',
  templateUrl: './niftytrader.component.html',
  styleUrls: ['./niftytrader.component.css']
})
export class NiftytraderComponent implements OnInit {

  @Input()  public Nifty_Put_Buying :number |any
  @Input()  public Nifty_Put_Long_Covering :number |any
  @Input()  public Nifty_Put_Short_Covering :number |any
  @Input()  public Nifty_Call_Buying : string| any
  @Input()  public Nifty_Call_Long_Covering :number |any
  @Input()  public Nifty_Call_Short_Covering :number |any
  @Input()  public Nifty_Call_Writing :number |any
  @Input()  public Nifty_Put_Writing :number |any
 

  @Input()  public BANK_Put_Buying :number |any
  @Input()  public BANK_Put_Long_Covering :number |any
  @Input()  public BANK_Put_Short_Covering :number |any
  @Input()  public BANK_Put_Writing : string| any
  @Input()  public BANK_Call_Buying :number |any
  @Input()  public BANK_Call_Long_Covering :number |any
  @Input()  public BANK_Call_Short_Covering :number |any
  @Input()  public BANK_Call_Writing :number |any
  

  // @Input() public bgcolor : string| any

 
  
  constructor() { }

  ngOnInit(): void {
  }

}
