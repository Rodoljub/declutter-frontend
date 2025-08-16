import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './core/auth/token.interceptor';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidebarVisible = false;


  toggleSidebar() {
  this.sidebarVisible = !this.sidebarVisible;
}
}
