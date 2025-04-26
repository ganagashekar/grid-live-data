import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-optioncharts',
  templateUrl: './optioncharts.component.html',
  styleUrls: ['./optioncharts.component.css']
})
export class OptionchartsComponent implements OnInit {
 
  imageurl=''
  daatat="";
  constructor() { 
  }

  ngOnInit(): void {

    setInterval(() => {
      this.loadbank()
      }, 10000);
      }
  

  loadbank(){

    this.daatat=formatDate(new Date(), 'yyyyMMdd', 'en')
    var filename="data2_filtered"+this.daatat+".png?"+ new Date().getTime()
    this.imageurl="http://localhost:81/assets/liveOptions/Bank/Options/"+filename
  }

}


