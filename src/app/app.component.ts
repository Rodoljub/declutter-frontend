import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './core/auth/token.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'declutter-app';
}
