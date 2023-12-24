import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-toggle',
  templateUrl: './notification-toggle.component.html',
  styleUrls: ['./notification-toggle.component.css']
})
export class NotificationToggleComponent implements OnInit {

  // color: ThemePalette = 'primary';

  // @Input() selected: boolean = false;
  // @Input() msnid: string ="";
  // @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  // public toggleSelected() {
  //   debugger;
  //   this.selected = !this.selected;
  //   this.selectedChange.emit({msnid:this.msnid,selected:this.selected});
  // }


}
