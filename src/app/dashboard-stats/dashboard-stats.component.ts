import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent implements OnInit {


  @Input()  public current_Change :number |any
  @Input()  public current_advance :number |any
  @Input()  public current_decline :number |any
  @Input() public Type : string| any
  @Input() public bgcolor : string| any

  @Input()  public pre_Change :number |any
  @Input()  public pre_advance :number |any
  @Input()  public pre_decline :number |any
  @Input() public pre_bgcolor : string| any

 
  constructor() { }

  ngOnInit(): void {
  }

}
