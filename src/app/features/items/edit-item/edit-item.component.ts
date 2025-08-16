import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  standalone: true,
 imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number;
  name = '';
  category = '';

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchItem();
  }

  fetchItem() {
    this.http.get<any>(`http://localhost:3000/items/${this.id}`)
      .subscribe({
        next: data => {
          this.name = data.name;
          this.category = data.category;
        },
        error: err => console.error('Failed to fetch item', err)
      });
  }

  updateItem() {
    this.http.put(`http://localhost:3000/items/${this.id}`, { name: this.name, category: this.category })
      .subscribe({
        next: () => this.router.navigate(['/items']),
        error: err => console.error('Failed to update item', err)
      });
  }
}
