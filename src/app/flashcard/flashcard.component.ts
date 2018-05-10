import { Component, OnInit } from '@angular/core';
import { GroupsService, Groups } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subjects, SubjectsService } from '../api/subjects.service';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  subjectsId: string;
  subjects: Subjects[];
  groupsId: string;
  groups: Groups[];
  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    //public apiCard: CardsService,
    public apiSubject: SubjectsService,

    private resTruc: Router
  ) { }

  ngOnInit() {
  
      }

  
}