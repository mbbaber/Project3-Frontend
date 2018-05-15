import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent {

  // Doughnut
  @Input('percentage') public percentage: number;

  public doughnutChartLabels:string[] = ['complete', 'not complete'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartData() {
    return [this.percentage, 100 - this.percentage]
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
