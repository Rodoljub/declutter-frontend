import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-decision-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './decision-dialog.component.html',
  styleUrl: './decision-dialog.component.scss'
})
export class DecisionDialogComponent {
  notes: string = '';
  loading = false;

  constructor(
    private itemService: ItemService,
    public dialogRef: MatDialogRef<DecisionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: number; decision: string }
  ) {}

  confirm() {
    this.loading = true;
    const backendDecision = (this.data.decision || '').toUpperCase();
    this.itemService.updateDecision(this.data.itemId, backendDecision, this.notes)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.dialogRef.close(true); // send success flag to parent
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
