import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output() searchFilter: EventEmitter<string> = new EventEmitter<string>();

  value: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: string) {
    this.searchFilter.emit(value);
  }

}
