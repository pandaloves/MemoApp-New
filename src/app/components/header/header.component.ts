import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ThemeService } from '../../services/ThemeService';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  darkMode = false;
  username: string | null = null;
  toaster = inject(ToastrService);
  storageService = inject(StorageService);

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });

    this.getUsernameFromToken();
  }

  // Open the menu
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  // Close the menu
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  // Retrieve the username from the token
  getUsernameFromToken() {
    const token = this.storageService.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.username = decodedToken.Username;
      } catch (error) {
        console.error('Failed to decode token:', error);
        this.username = null;
      }
    }
  }

  // Log out the user
  logOut() {
    this.storageService.removeItem('token');
    this.toaster.error('Loggat ut framgångsrikt!');

    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }

  // Toggle the theme
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
