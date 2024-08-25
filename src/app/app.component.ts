import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/ThemeService';
import { FooterComponent } from './components/footer/footer.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MemoApp-New';
  darkMode = false;
  showHeader: boolean = true;
  showFooter: boolean = true;
  isLoading = true;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private storageService: StorageService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !['/login', '/signup'].includes(
          event.urlAfterRedirects
        );
        this.showFooter = !['/login', '/signup'].includes(
          event.urlAfterRedirects
        );
      }
    });

    this.detectColorScheme();
  }

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });

    // Perform authentication check here
    const token = this.storageService.getItem('token');
    if (token) {
      this.isLoading = false;
    } else {
      this.router.navigate(['/login']);
    }
  }

  detectColorScheme() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      // Check if the user's system prefers dark mode
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkMode = true;

        document.documentElement.setAttribute(
          'data-theme',
          this.darkMode ? 'dark' : 'light'
        );
      }
    }
  }

  // Toggle the theme between dark and light mode
  toggleTheme() {
    this.darkMode = !this.darkMode;

    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
    this.themeService.toggleTheme();
  }
}
