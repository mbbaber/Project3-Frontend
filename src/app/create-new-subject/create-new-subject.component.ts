import { Component, OnInit } from '@angular/core';
import { SubjectsService, Subject, Card, NewCard } from '../api/subjects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-new-subject',
  templateUrl: './create-new-subject.component.html',
  styleUrls: ['./create-new-subject.component.css']
})
export class CreateNewSubjectComponent implements OnInit {

  subjectId: string;
  subjectData: Subject;

  subjectCards: Card[];
  subjectKeywords: Array<string>;

  newCard: NewCard = new NewCard();

  constructor(
    public subService: SubjectsService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSubjectId()
    
  }

  getSubjectId(){
    this.actRoute.paramMap
    .subscribe(myParams=>{
      this.subjectId = myParams.get('subId');
      this.getSubjectData()
    })
  }

  getSubjectData(){
    this.subService.getSubInfo(this.subjectId)
    .then((result)=>{
      this.subjectData= result;
      this.subjectCards = result.cards;
      this.subjectKeywords = result.keywords;
    })
    .catch((err)=>{
      console.log(err, 'error getting sub info')
    })
  }

  newCardSubmit(){
    if(this.newCard.front === "" || this.newCard.back === ""){
      return;
    }
    this.subService.getCardInfo(this.newCard, this.subjectId)
    .then((result)=>{
      this.subjectData = result;
      this.subjectCards = result.cards;
      this.subjectKeywords = result.keywords;
    })
    .catch((err)=>{
      console.log(err, 'error adding a new card')
    })
  }
  
  deleteCardSubmit(card){
    console.log(card)
    this.subService.deleteThisCard(card, this.subjectId)
    .then((result)=>{
      this.subjectData = result;
      this.subjectCards = result.cards;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
