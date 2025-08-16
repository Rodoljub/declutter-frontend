import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  name = '';
  category = '';

  constructor(private http: HttpClient, private router: Router) {}

  addItem() {
    if (!this.name || !this.category) return;

    this.http.post('http://localhost:3000/items', { name: this.name, category: this.category })
      .subscribe({
        next: () => this.router.navigate(['/items']),
        error: err => console.error('Failed to add item', err)
      });
  }
}
