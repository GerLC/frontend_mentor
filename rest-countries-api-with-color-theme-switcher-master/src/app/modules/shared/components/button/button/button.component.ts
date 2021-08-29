import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonConfig: any;
  @Output() backBtnClickEmt: EventEmitter<string> = new EventEmitter<string>();
  @Output() borderBtnClickEmt: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onBorderBtnClick() {
    this.borderBtnClickEmt.emit('You have clicked on a border button.');
  }

  onBackBtnClick() {
    this.backBtnClickEmt.emit('You have clicked go back button.');
  }

}
