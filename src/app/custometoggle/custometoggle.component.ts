import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-custometoggle',
  templateUrl: './custometoggle.component.html',
  styleUrls: ['./custometoggle.component.css']
})
export class CustometoggleComponent implements OnInit {
  color: ThemePalette = 'primary';

  @Input() selected: boolean = false;
  @Input() msnid: string ="";
  @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  public toggleSelected() {
    debugger;
    this.selected = !this.selected;
    this.selectedChange.emit({msnid:this.msnid,selected:this.selected});
  }


}
