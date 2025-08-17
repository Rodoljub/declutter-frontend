import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-decision-stats',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './decision-stats.component.html',
  styleUrl: './decision-stats.component.scss'
})
export class DecisionStatsComponent {
  stats: Record<string, number> = { keep: 0, donate: 0, sell: 0, discard: 0 };
  loading = true;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
     this.itemService.getDecisionStats().subscribe((res) => {
      if (res.success) this.stats = res.stats;
      this.loading = false;
    });
  }
}
