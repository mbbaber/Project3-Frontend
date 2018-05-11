import { Component, OnInit } from '@angular/core';
import { GroupsService, Groups } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, Card } from '../api/subjects.service';
import { Stat, StatsService } from '../api/stats.service';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  subjectId: string;
  subject: Subject;
  groupsId: string;
  groups: Groups;

  currentCardId: number = -1;

  currentCard: Card;

  classState: any = {
    showForm: true,
  };

  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    public apiStats: StatsService,
    public apiSubject: SubjectsService,
    private resTruc: Router
  ) { }

  ngOnInit() {
    this.reqTruc.paramMap
      .subscribe((myParams) => {
        this.subjectId = myParams.get('subjectId');

        this.getCardsList()
            .then( (subject: Subject) => this.getNextCard());
      })
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

  getNextCard() {
    this.flipBackVisibility();
    this.currentCardId = (this.currentCardId + 1) % this.subject.cards.length;
    this.currentCard = this.subject.cards[this.currentCardId];
    console.log(this.currentCard);
    //    Math.floor((Math.random() * cards.length));
  }

  flipBackVisibility() {
    this.classState.showForm = !this.classState.showForm;
  }

  rateCardandUpdate(rating: number) {
    this.getNextCard();
    console.log(rating);
    let ids = {
      card: this.currentCardId,
      group: this.groups, 
      subject: this.subjectId,
      rating //rating
    }
    console.log(this.groups)
    console.log(ids);

    this.apiStats.getStatsList(ids)
    .then((result)=>{
      console.log(result);
    })
    .catch((err)=>{
      console.log('error rate card and update');
      console.log(err)
    })

  }
}



