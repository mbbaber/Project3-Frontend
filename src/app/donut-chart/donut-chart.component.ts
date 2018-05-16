import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent {

  // Doughnut
  @Input('percentage') public percentage: number;
  public chartColors: any[] = [
    {
      backgroundColor:["rgb(50, 152, 224)", "rgba(64,64,64,1)"],
      borderColor: ["rgb(50, 152, 224)", "rgba(64,64,64,1)"],
      borderWidth: [2, 0],
      
    }];

    public doughnutChartOptions: any = {
      cutoutPercentage: 75,
      
    };
     
  

  //public doughnutChartLabels:string[] = ['complete', 'not complete'];
  //public doughnutChartData:number[] = [350, 450, 100];
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
