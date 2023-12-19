import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default 
})
export class BarchartComponent implements OnChanges {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() doctorNames: string[] = [];
  @Input() patientCounts: number[] = [];

  constructor() {
  console.log(this.doctorNames,'heyyy');
     this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Doctor OverView"
      },
      xaxis: {
        categories: []
      }
    };
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called:', changes);
    changes.doctorNames.currentValue.forEach((y =>{
      this.chartOptions?.xaxis.categories.push(y)

    }))
    changes.patientCounts.currentValue.forEach((x =>{
      this.chartOptions?.series[0].data.push(x)

    }))
  }
}
