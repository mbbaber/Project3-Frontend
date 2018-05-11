import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, Card } from '../api/subjects.service';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  subjectId: string;
  subject: Subject;
  groupsId: string;
  groups: Group[];

  currentCardId: number = -1;

  currentCard: Card;

  classState: any = {
    showForm: true,
  };

  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    //public apiCard: CardsService,
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

  }



  flipBackVisibility() {
    this.classState.showForm = !this.classState.showForm;
  }

  rateCard(rating: number) {
    this.getNextCard();
  }
}

//   NextCard() {
//     Math.floor((Math.random() * cards.length));
// }
