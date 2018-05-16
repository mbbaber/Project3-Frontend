import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-stats',
  templateUrl: './group-stats.component.html',
  styleUrls: ['./group-stats.component.css']
})
export class GroupStatsComponent {

  @Input('statsBySubject') public statsBySubject: any;
  @Input('subject') public subject: any

  getAverageCompleteForSubject(subjectId){
    if (!this.statsBySubject[subjectId]) {
      return {};
    }
    return this.statsBySubject[subjectId].avePercentageComplete; 
  }


  getDistributionForDonut(subjectId){
    var distributionForDonut = [];
    var sumOfCardRatings = this.statsBySubject[subjectId].cardRatingsDistribution['1']
    + this.statsBySubject[subjectId].cardRatingsDistribution['2']
    + this.statsBySubject[subjectId].cardRatingsDistribution['3']
    + this.statsBySubject[subjectId].cardRatingsDistribution['4']
    + this.statsBySubject[subjectId].cardRatingsDistribution['5']

    var arrayOfRatings = [this.statsBySubject[subjectId].cardRatingsDistribution['1'], 
    this.statsBySubject[subjectId].cardRatingsDistribution['2'],
    this.statsBySubject[subjectId].cardRatingsDistribution['3'],
    this.statsBySubject[subjectId].cardRatingsDistribution['4'],
    this.statsBySubject[subjectId].cardRatingsDistribution['5']
  ]
    arrayOfRatings.forEach((one) => {
      var percentage = (one / sumOfCardRatings) * 100
      distributionForDonut.push(percentage)
    }); 
    return distributionForDonut;
  }

}
