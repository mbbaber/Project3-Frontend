// When you go to a webpage
import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, Card } from '../api/subjects.service';
import { Stat, StatsService } from '../api/stats.service';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})

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

        this.getCardsList()
            .then( (subject: Subject) => this.getNextCard());
      
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

  // //OTHER NOTES ABOUT CARD ORDER
  // // var randomNewCardNumber = Math.floor(Math.random()*this.subject.cards.length
  // // cardSeenWeight = (5-ranking)/(sumOfTotalCardWeights)
  // // eventually, will rank based on card weights and then print all already-seen cards in this order

  // // But for now, here is a simpler version.

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
        for (var i=0; i < ratedStats.length; i++){
          if (card._id == ratedStats[i].card) {
            return false
          }
        }
        return true
      });

    // generate a random number between 0 and 1 (var num= Math.random();)
    var chooseNewCard = (ratedStats.length <= 3) || ((unseenCards.length > 0) && (Math.random() < 0.4))


    // set probabilty of getting new card (set whatever you want)
    if (chooseNewCard) {  // for instance, 40% of the time
      this.currentCard = unseenCards[0];
    } else {

      // show the cards by rank
      var choices = [];
      ratedStats.forEach((stat) => {
        const numberOfAppearances = 6-stat.rating
        for (var i = 0; i < numberOfAppearances; i++){
          choices.push(stat.card)
        }  
      })
      var randomCardIndex = Math.floor(Math.random()*choices.length)
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
      })
      .catch((err) => {
        console.log('error rate card and update');
        console.log(err)
      })

  }
}



