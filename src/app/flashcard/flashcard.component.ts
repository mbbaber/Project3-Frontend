// When you go to a webpage
import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, Card } from '../api/subjects.service';
import { Stat, StatsService } from '../api/stats.service';

//Pie chart
//import { Component } from '@angular/core';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
  //Pie chart
  //selector: ,
  //templateUrl: './pie-chart-demo.html'
})

// //Pie chart
// export class PieChartDemoComponent {
//   // Pie
//   public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
//   public pieChartData:number[] = [300, 500, 100];
//   public pieChartType:string = 'pie';
 
//   // events
//   public chartClicked(e:any):void {
//     console.log(e);
//   }
 
//   public chartHovered(e:any):void {
//     console.log(e);
//   }
// }

export class FlashcardComponent implements OnInit {
  // properties (aka fields) of the class
  subjectId: string;
  subject: Subject;
  groupId: string;
  stats: Stat[];
  currentCardId: number = -1;
  currentCard: Card;
  classState: any = {
    showForm: true,
  };
  individualStats: any;

  constructor(
    private reqTruc: ActivatedRoute, // where am I on the website + context (parameters)
    public apiGroup: GroupsService,
    public apiStats: StatsService,
    public apiSubject: SubjectsService,
    private resTruc: Router
  ) { }


  ngOnInit() { // when you load the page
    this.reqTruc.paramMap
      .subscribe((myParams) => {
        this.subjectId = myParams.get('subjectId');
        this.groupId = myParams.get('groupId');
        this.getIndividualStats();
        this.getCardsList()
          .then((subject: Subject) => this.getNextCard());
          

      })


    console.log(this.apiGroup.currentGroup)
  }

  getCardsList() {
    return this.apiSubject.getSubDetails(this.subjectId)
      .then((result: Subject) => {
        this.subject = result;
        return this.subject;
      })
      .catch((err) => {
        console.log('Subject details error')
        console.log(err)
      })
  }

  getStatsList() {
    return this.apiStats.getAllStatsForUser(this.subjectId)
      .then((result: Stat[]) => {
        this.stats = result;
        return this.stats;
      })
      .catch((err) => {
        console.log('Stats details error')
        console.log(err)
      })
  }

  // DETERMINE CARD ORDER

  getNextCard() {
    this.flipBackVisibility();

    this.getStatsList()
      .then((stats: Stat[]) => {

        var ratedStats = stats.filter((stat) => {
          return stat.rating !== 0;
        });

        // The filter() method creates a new array with all elements that pass the test implemented by the provided function
        // create an array that only contains cards that are not rated (not in ratedStats array)
        var unseenCards = this.subject.cards.filter((card: Card) => {
          for (var i = 0; i < ratedStats.length; i++) {
            if (card._id == ratedStats[i].card) {
              return false
            }
          }
          return true
        });

        // generate a random number between 0 and 1 (var num= Math.random();)
        var chooseNewCard = (ratedStats.length <= 3) || ((unseenCards.length > 0) && (Math.random() < 0.7))

        // set probabilty of getting new card (set whatever you want)
        if (chooseNewCard) {  // for instance, 70% of the time
          this.currentCard = unseenCards[0];
        } else {

          // show the cards by rank
          var choices = [];
          ratedStats.forEach((stat) => {
            const numberOfAppearances = 6 - stat.rating
            for (var i = 0; i < numberOfAppearances; i++) {
              choices.push(stat.card)
            }
          })
          var randomCardIndex = Math.floor(Math.random() * choices.length)
          this.currentCard = choices[randomCardIndex];

          this.currentCard = this.subject.cards.find((card) => {
            if (card._id === choices[randomCardIndex]) {
              return true
            }
            return false
          });
          // this.currentCardId = (this.currentCardId + 1) % this.subject.cards.length;
          // this.currentCard = this.subject.cards[this.currentCardId]

          console.log(this.currentCard);
        }
      })
  }

  getIndividualStats() {
    var promiseCards = this.getCardsList()
    var promiseStats = this.getStatsList()
    Promise.all([promiseStats, promiseCards])
      .then((result: any) => {
        const ratedStats = result[0];
        const subjectCards = result[1].cards;

        //get basic stats
        var numberOfCards = subjectCards.length

    
        var sumOfRatings = ratedStats.reduce(function (a, b) {
          return a + b.rating;
        }, 0);
        var averageRating = (sumOfRatings / numberOfCards)

        var percentageComplete = averageRating / 5 * 100

        var cardsViewed = ratedStats.length

        //get card distribution and number of cards mastered (rating of 5)
        var cardRatingsDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ratedStats.forEach((stat) => {
          cardRatingsDistribution[stat.rating]++
        })

        var numberCardsMastered = cardRatingsDistribution[5];

        // get best and worst cards

        var maxRating = ratedStats.reduce(function(a: number, b: Stat) {
          return Math.max(a, b.rating);
        }, 0);
        
        var bestStat; //card with highest rating and minimum number of views
        ratedStats.forEach((stat: Stat) => {
          if (stat.rating === maxRating){
            if (bestStat === undefined || (stat.seen < bestStat.seen)){
              bestStat = stat;
            }
          }
        })

        var bestCard = subjectCards.find((card) => {
          return bestStat.card === card._id
        })
        

        var minRating = ratedStats.reduce(function(a: number, b: Stat) {
          return Math.min(a, b.rating);
        }, 5);
        
        var worstStat; //card with lowest rating and maximum number of views
        ratedStats.forEach((stat: Stat) => {
          if (stat.rating === minRating){
            if (worstStat === undefined || (stat.seen > worstStat.seen)){
              worstStat = stat;
            }
          }
        })

        var worstCard = subjectCards.find((card) => {
          return worstStat.card === card._id
        })

        this.individualStats = {
          numberOfCards, 
          sumOfRatings, 
          averageRating, 
          percentageComplete,  
          cardsViewed, 
          cardRatingsDistribution, 
          numberCardsMastered,
          bestCard, 
          worstCard
        }
        console.log("IndividualStats recalculated:" + JSON.stringify(this.individualStats))
      })
      .catch((err) => { 
        console.log("individual stats error")
        console.log(err)
      })
  };

  flipBackVisibility() {
    this.classState.showForm = !this.classState.showForm;
  }

  rateCardandUpdate(rating: number) {
    this.getNextCard();
  
    let ids = {
      card: this.currentCard,
      group: this.groupId,
      subject: this.subjectId,
      rating: rating
    }

    this.apiStats.getStatsList(ids)
      .then((result: Stat[]) => {
        console.log(result);
        this.stats = result;
        this.getIndividualStats();
      })
      .catch((err) => {
        console.log('error rate card and update');
        console.log(err)
      })

  }
}



