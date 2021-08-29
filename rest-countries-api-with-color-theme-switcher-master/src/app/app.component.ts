import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, Renderer2 } from '@angular/core';
import { LoadingService } from './modules/core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'rest-countries-api-with-color-theme-switcher-master';

  private currentTheme = 'mat-app-background theme-light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public loadingService: LoadingService
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
