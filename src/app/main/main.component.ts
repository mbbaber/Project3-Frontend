import { Component, OnInit } from '@angular/core';
import { GroupsService, Groups } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, chooseSub } from '../api/subjects.service';
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

  thisSub: chooseSub;
  addSubState: boolean = false;

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


  }

  getSubjectsList() {
    this.apiGroup.getDetails(this.groupsId)
    .then((result: Groups[]) => {
      this.groups = result;
      this.checkIfAdmin();
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
        console.log(result.userInfo._id , this.groups.admin)
        console.log('youre the admin of this group')
        this.isAdmin = true;
      }else{
        console.log(result.userInfo._id , this.groups.admin)
        this.isAdmin = false;
        console.log('youre NOT the admin of this group')
      }
    })
    .catch((err)=>{
      console.log('err seeing if admin')
    })
  }

  showAddSubForm(){
    this.apiSubject.getAllTheSubjects()
    .then((result)=>{
      this.subjects = result;
      this.addSubState = !this.addSubState;
      console.log(result)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  // addThisSub(subId){
  //   this.apiSubject.getThisSub(subId)
  //   .then(()=>{
  //     this.addSubState = !this.addSubState;
  //   })
  //   .catch(()=>{})

  // }
}
  
