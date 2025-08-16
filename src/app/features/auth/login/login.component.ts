import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';


  constructor(private router: Router, private api: ApiService) {}

login() {
  this.api.post<{ token: string }>('auth/login', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);  // store token
      this.router.navigate(['/items']);
    },
    error: (err) => {
      console.error('Login failed', err);
      alert('Login failed: ' + (err.error?.message || err.statusText));
    }
  });
}


}
