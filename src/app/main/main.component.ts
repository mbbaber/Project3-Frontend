import { Component, OnInit } from '@angular/core';
import { GroupsService, Groups } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService } from '../api/subjects.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  subjectsId: string;
  subjects: Subject[];
  groupsId: string;
  groups: any;

  isAdmin: boolean;

  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    public apiSubject: SubjectsService,
    private resTruc: Router,
    public userService: UserService
  ) { }

  ngOnInit() {

    this.reqTruc.paramMap
      .subscribe((myParams) => {
        this.groupsId = myParams.get('groupId');
        this.getSubjectsList();
      })

    this.checkIfAdmin();
  }
  getSubjectsList() {
    this.apiGroup.getDetails(this.groupsId)
    .then((result: Groups[]) => {
      this.groups = result;
    })
    .catch((err) => {
      console.log('Group details error')
      console.log(err)
    })
  }

  checkIfAdmin(){
    this.userService.checkLogin()
    .then((result)=>{
      if(result.userInfo._id === this.groups.admin){
        // console.log(result.userInfo._id , this.groups.admin)
        // console.log('youre the admin of this group')
        this.isAdmin = true;
      }else{
        // console.log(result.userInfo._id , this.groups.admin)
        this.isAdmin = false;
      }
    })
    .catch((err)=>{
      console.log('err seeing if admin')
    })
  }

}
  
