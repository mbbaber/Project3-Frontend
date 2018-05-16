import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  //public doughnutChartLabels: string[] = ['1', '2', "3", "4", "5"];
  @Input('chartdata') public doughnutChartData: number[] = [0,0,0,0,0];
  public doughnutChartType: string = 'doughnut';

  // Pie
  public chartColors: any[] = [
    {
      backgroundColor: ["rgb(208, 56, 77)", "rgb(250, 156, 88)", "rgb(243, 250, 173)", "rgb(152, 213, 164)", "rgb(50, 152, 224)"],
      borderColor: ["rgb(208, 56, 77)", "rgb(250, 156, 88)", "rgb(243, 250, 173)", "rgb(152, 213, 164)", "rgb(50, 152, 224)"],
      //borderWidth: [2, 0],

    }];

  public doughnutChartOptions: any = {
    cutoutPercentage: 0,
    legend: {
      display: true
    }
    // responsive: true
  };

  // @Input('chartdata') public data: number[];



  // events
  public chartClicked(e: any): void {

    console.log(e);
  }

  // public getChartData() {
  //   this.doughnutChartData = this.data;
  //   return this.doughnutChartData;
  // }

  public chartHovered(e: any): void {
    console.log(e);
  }

}