import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApexChart, ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-daily-progress',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './daily-progress.component.html',
  styleUrl: './daily-progress.component.scss'
})
export class DailyProgressComponent {

  chart: ApexChart = { type: 'bar', height: 350 };

  chartOptions: ApexOptions = {
    chart: this.chart,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Items Decided',
      },
    },
    fill: {
      opacity: 1,
    },
  };
  series = [{ name: 'Items Decided', data: [] }];
  loading = true;

  constructor(private http: HttpClient, private itemService: ItemService) {}

  ngOnInit(): void {
    const userId = 1; // Replace with actual user ID
    this.itemService.getDailyDecisionStats()
      .subscribe((res) => {
        if (res.success) {
          this.chartOptions.xaxis!.categories = Object.keys(res.stats);
          this.series[0].data = Object.values(res.stats);
        }
        this.loading = false;
      });
  }
}
