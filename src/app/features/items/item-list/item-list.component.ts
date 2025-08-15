import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

interface Item {
  id: number;
  name: string;
  category: string;
  notes?: string;
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.http.get<Item[]>('http://localhost:3000/items').subscribe({
      next: (data) => (this.items = data),
      error: (err) => console.error('Failed to fetch items', err),
    });
  }

  editItem(item: Item) {
    // Navigate to edit page (we'll create Add/Edit component later)
    this.router.navigate(['/edit-item', item.id]);
  }

  deleteItem(id: number) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    this.http.delete(`http://localhost:3000/items/${id}`).subscribe({
      next: () => (this.items = this.items.filter((i) => i.id !== id)),
      error: (err) => console.error('Failed to delete item', err),
    });
  }
}
