import { Component } from '@angular/core';
import { DailyProgressComponent } from '../daily-progress/daily-progress.component';
import { DecisionStatsComponent } from '../decision-stats/decision-stats.component';

@Component({
  selector: 'app-declutter-dashboard',
  standalone: true,
  imports: [
    DailyProgressComponent,
    DecisionStatsComponent
  ],
  templateUrl: './declutter-dashboard.component.html',
  styleUrl: './declutter-dashboard.component.scss'
})
export class DeclutterDashboardComponent {

}
