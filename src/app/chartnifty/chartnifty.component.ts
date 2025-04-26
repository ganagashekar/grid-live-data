import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-chartnifty',
  templateUrl: './chartnifty.component.html',
  styleUrls: ['./chartnifty.component.css']
})
export class ChartniftyComponent implements OnInit {

  imageurl=''
  daatat=''
  constructor() { 
  }

  ngOnInit(): void {

    setInterval(() => {
      this.loadbank()
      }, 1000);
      }
  

  loadbank(){

    this.daatat=formatDate(new Date(), 'yyyyMMdd', 'en')
        var filename="data2_filtered"+this.daatat+".png?"+ new Date().getTime()
        this.imageurl="http://localhost:81/assets/liveOptions/Nifty/Options/"+filename
  }
}
