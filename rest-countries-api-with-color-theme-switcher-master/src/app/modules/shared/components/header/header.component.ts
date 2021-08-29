import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  isDarkMode: boolean = false;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onDarkMode({checked}: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }
}
