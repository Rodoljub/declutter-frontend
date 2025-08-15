import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: ApiService) {}

  login() {
    this.api.post('auth/login', { email: this.email, password: this.password })
      .subscribe((res: any) => {
        localStorage.setItem('token', res['token']);
      });
  }
}
