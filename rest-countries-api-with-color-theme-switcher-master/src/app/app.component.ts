import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rest-countries-api-with-color-theme-switcher-master';

  private currentTheme = 'mat-app-background theme-light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('activeTheme') || 'mat-app-background theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  switchTheme(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? 'mat-app-background theme-dark' : 'mat-app-background theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    localStorage.setItem('activeTheme', this.currentTheme);
  }


}
