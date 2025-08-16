// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-history-dialog',
//   standalone: true,
//   imports: [],
//   templateUrl: './history-dialog.component.html',
//   styleUrl: './history-dialog.component.scss'
// })
// export class HistoryDialogComponent {

// }

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-history-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Decision History</h2>
    <mat-dialog-content class="history-content">
      <mat-list *ngIf="history.length; else noHistory">
        <mat-list-item *ngFor="let record of history">
          <span class="icon">{{ getDecisionIcon(record.type) }}</span>
          <strong>{{ record.type | titlecase }}</strong>
          <span class="notes">{{ record.notes || 'No notes' }}</span>
          <span class="date">{{ record.createdAt | date : 'short' }}</span>
        </mat-list-item>
      </mat-list>
      <ng-template #noHistory>
        <p>No decision history yet.</p>
      </ng-template>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .history-content {
        max-height: 400px; /* limit height */
        overflow-y: auto; /* scroll if content exceeds height */
      }

      mat-list-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
      }

      .notes {
        flex: 1;
        margin-left: 16px;
        color: #555;
      }

      .date {
        margin-left: 16px;
        font-size: 0.8em;
        color: gray;
        white-space: nowrap;
      }

      .icon {
        margin-right: 8px;
        font-size: 1.2em;
      }
    `,
  ],
})
export class HistoryDialogComponent {
  history: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { history: any[] }
  ) {
    this.history = data.history;
  }

  getDecisionIcon(decision: string): string {
    switch (decision.toUpperCase()) {
      case 'KEEP':
        return '✅';
      case 'DONATE':
        return '🛍️';
      case 'SELL':
        return '💰';
      case 'TRASH':
        return '🗑️';
      default:
        return '❔';
    }
  }
}
