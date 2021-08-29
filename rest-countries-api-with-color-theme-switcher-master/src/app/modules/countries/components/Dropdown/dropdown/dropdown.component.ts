import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Output() region = new EventEmitter<string>();

  regions = new FormControl();
  regionList: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(region: string) {
    this.region.emit(region);
  }
  

}
