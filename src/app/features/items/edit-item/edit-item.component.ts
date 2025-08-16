import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService, Item } from '../item.service';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);

  id!: number;
  name = '';
  category = '';

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchItem();
  }

  fetchItem() {
    this.itemService.getItem(this.id).subscribe({
      next: (item) => {
        if (!item) {
          console.error('Item not found');
          this.router.navigate(['/items']);
          return;
        }
        this.name = item.name;
        this.category = item.category;
      },
      error: (err) => {
        console.error('Failed to fetch item', err);
        this.router.navigate(['/items']);
      },
    });
  }

  updateItem() {
    const updated: Partial<Item> = { name: this.name, category: this.category };
    this.itemService.updateItem(this.id, updated).subscribe({
      next: () => this.router.navigate(['/items']),
      error: (err) => console.error('Failed to update item', err),
    });
  }
}
