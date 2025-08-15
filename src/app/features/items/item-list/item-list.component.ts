import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

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
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.http.get<Item[]>('http://localhost:3000/items')
      .subscribe({
        next: data => this.items = data,
        error: err => console.error('Failed to fetch items', err)
      });
  }
}