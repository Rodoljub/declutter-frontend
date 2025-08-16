import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DecisionDialogComponent } from '../decision-dialog/decision-dialog.component';
import { ItemService } from '../item.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';

interface Item {
  id: number;
  name: string;
  category: string;
  notes?: string;
  decision?: string;
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  showDecisionButtonsMap: Record<number, boolean> = {}; 

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;

      this.showDecisionButtonsMap = {};
    });
  }

  editItem(item: Item) {
    // Navigate to edit page (we'll create Add/Edit component later)
    this.router.navigate(['/edit-item', item.id]);
  }

  deleteItem(id: number) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter((item) => item.id !== id);
    });
  }

  viewHistory(itemId: number) {
    this.itemService.viewHistory(itemId).subscribe((history) => {
      this.dialog.open(HistoryDialogComponent, {
        width: '400px',
        data: { history },
      });
    });
  }

  toggleDecisionButtons(itemId: number) {
    this.showDecisionButtonsMap[itemId] = !this.showDecisionButtonsMap[itemId];
  }

  makeDecision(itemId: number, decision: string) {
    const dialogRef = this.dialog.open(DecisionDialogComponent, {
      width: '300px',
      data: { itemId, decision },
    });

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.loadItems(); // refresh list if updated
        this.showDecisionButtonsMap[itemId] = false;
      }
    });
  }

  getDecisionIcon(decision: string): string {
    switch (decision.toUpperCase()) {
      case 'KEEP':
        return 'thumb_up';
      case 'DONATE':
        return 'volunteer_activism';
      case 'SELL':
        return 'sell';
      case 'TRASH':
        return 'delete_sweep';
      default:
        return 'help';
    }
  }

  getDecisionColor(decision: string): string {
    switch (decision.toUpperCase()) {
      case 'KEEP':
        return '#C8E6C9'; // light green background
      case 'DONATE':
        return '#BBDEFB'; // light blue background
      case 'SELL':
        return '#FFE0B2'; // light orange background
      case 'TRASH':
        return '#FFCDD2'; // light red background
      default:
        return '#E0E0E0'; // light gray
    }
  }

  getDecisionIconColor(decision: string): string {
    switch (decision.toUpperCase()) {
      case 'KEEP':
        return '#4CAF50'; // green icon
      case 'DONATE':
        return '#2196F3'; // blue icon
      case 'SELL':
        return '#FF9800'; // orange icon
      case 'TRASH':
        return '#F44336'; // red icon
      default:
        return '#9E9E9E'; // gray
    }
  }
}
