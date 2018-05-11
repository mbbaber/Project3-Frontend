import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService } from '../api/subjects.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  subjectsId: string;
  subjects: Subject[];
  groupsId: string;
  groups: Group[];

  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    public apiSubject: SubjectsService,
    private resTruc: Router
  ) { }

  ngOnInit() {
    this.reqTruc.paramMap
      .subscribe((myParams) => {
        this.groupsId = myParams.get('groupId');
        this.getSubjectsList();
      })
  }
  getSubjectsList() {
    this.apiGroup.getDetails(this.groupsId)
    .then((result: Group[]) => {
      this.groups = result;
    })
    .catch((err) => {
      console.log('Group details error')
      console.log(err)
    })
}

}
  
