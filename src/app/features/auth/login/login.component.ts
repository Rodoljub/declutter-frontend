import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  login() {
    // For now, just log the values
    console.log('Login submitted', { email: this.email, password: this.password });
    // Temporary navigation after "login"
    this.router.navigate(['/items']);
  }
}
