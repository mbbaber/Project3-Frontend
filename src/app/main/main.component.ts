import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, chooseSub } from '../api/subjects.service';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  subjectsId: string;
  subjects: any;
  groupsId: string;
  groups: any;
  subject: Subject;
  isAdmin: boolean;

  allUsersWhoBelong: User[];
  allUsersWhoDontBelong: User[];
  thisSub: chooseSub;
  addUserState: boolean = false;
  addSubState: boolean = false;
  search: string = "";
  // searchUser: string = "";

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
    .then((result: Group[]) => {
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

    console.log(this.subjects)

  }

  selectedSubjectId: string = "";
  chooseThisSub(event:any){
    this.selectedSubjectId = event.target.value;
    console.log(this.selectedSubjectId)
  }

  addThisSub(){
    this.apiGroup.addSubjectToGroup(this.selectedSubjectId, this.groupsId)
    .then((result)=>{
      this.addSubState = false;
      this.getSubjectsList()
      console.log('added this subject to group')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  showAddUserForm(){
    this.addUserState = !this.addUserState;
    this.userService.getAllUsersWhoBelong(this.groupsId)
    .then((result)=>{
      this.allUsersWhoBelong = result;
      console.log(this.allUsersWhoBelong)
    })
    .catch((err)=>{
      console.log(err)
    })
    this.userService.getAllUsersWhoDontBelong(this.groupsId)
    .then((result)=>{
      this.allUsersWhoDontBelong = result;
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  addUserToGroup(userId){
    this.apiGroup.addThisUserToThisGroup(userId, this.groupsId)
    .then((result)=>{
      // this.addUserState = !this.addUserState;
      this.userService.getAllUsersWhoBelong(this.groupsId)
      this.userService.getAllUsersWhoDontBelong(this.groupsId)
      // this.allUsers = result;
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
  
