import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesService } from './data-access/services';
import { BehaviorSubject } from 'rxjs';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  chartMonthlySales$ = new BehaviorSubject<Chart>(new Chart({})) 
  chartmonthlySalesCount$ = new BehaviorSubject<Chart>(new Chart({})) 
  chartMonthlyProductSales$ = new BehaviorSubject<Chart>(new Chart({})) 
  constructor(private salesService: SalesService) { 
    this.fetchSalesData()
    this.fetchProductSalesData()
    this.fetchSalesCountData() 
  }

  ngOnInit(): void {
    
  }
  fetchSalesData(): void {
    this.salesService.getMonthlySales().subscribe(resp => {
      const series = resp.data?.map(item => {
        return {name: `Tháng ${item.month}`, data: [item.totalSales ?? 0] } as any
      })
      const chartMonthlySales = new Chart({
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Monthly Sales'
        },
        credits: {
          enabled: false
        },
        series: series
      })
      this.chartMonthlySales$.next(chartMonthlySales)
    });
  }

  fetchSalesCountData(): void {
    this.salesService.getMonthlySalesCount().subscribe(resp => {
      const series = resp.data?.map(item => {
        return {name: `Tháng ${item.month}`, data: [item.orderCount ?? 0] } as any
      })
      const chartmonthlySalesCount = new Chart({
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Monthly Sales'
        },
        credits: {
          enabled: false
        },
        series: series
      })
      this.chartmonthlySalesCount$.next(chartmonthlySalesCount)
    });
  }

  fetchProductSalesData(): void {
    this.salesService.getMonthlyProductSales().subscribe(resp => {
      const series = resp.data?.map(item => {
        return {name: `Tháng ${item.month}`, data: [item.productCount ?? 0] } as any
      })
      const chartMonthlyProductSales = new Chart({
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Monthly Product Sales'
        },
        credits: {
          enabled: false
        },
        series: series
      })
      this.chartMonthlyProductSales$.next(chartMonthlyProductSales)
    });
  }
}