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
        series: [
          {
            name: resp.data?.map(i=> ('Tháng ' + (i.month ?? 0))) ?? [],
            data: resp.data?.map(i=> i.totalSales ?? 0) ?? []
          } as any
        ]
      })
      this.chartMonthlySales$.next(chartMonthlySales)
    });
  }

  fetchSalesCountData(): void {
    this.salesService.getMonthlySalesCount().subscribe(resp => {
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
        series: [
          {
            name: resp.data?.map(i=> ('Tháng ' + (i.month ?? 0))) ?? [],
            data: resp.data?.map(i=> i.orderCount ?? 0) ?? []
          } as any
        ]
      })
      this.chartmonthlySalesCount$.next(chartmonthlySalesCount)
    });
  }

  fetchProductSalesData(): void {
    this.salesService.getMonthlyProductSales().subscribe(resp => {
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
        series: [
          {
            name: resp.data?.map(i=> ('Tháng ' + (i.month ?? 0))) ?? [],
            data: resp.data?.map(i=> i.productCount ?? 0) ?? []
          } as any
        ]
      })
      this.chartMonthlyProductSales$.next(chartMonthlyProductSales)
    });
  }
}