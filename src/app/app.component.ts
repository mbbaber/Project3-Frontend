import { Component } from '@angular/core';
import { GroupsService, Groups, BeginningGroup } from './api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, SignUpCredentials } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  groupsId: string;
  groups: Groups[];

  userId: string;
  userGroups: Groups[];

  logInState: boolean = false;
  signUpState: boolean = false;
  newGroupState: boolean = false;

  formCredentials: SignUpCredentials = new SignUpCredentials();
  newGroup: BeginningGroup = new BeginningGroup();

  title = 'app';
  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    private resTruc: Router,
    public userService: UserService,
    public response: Router
  ){ }

  ngOnInit() {
    // this.apiGroup.getGroupsList()
    //   .then((result: Groups[]) => {
    //     this.groups = result;
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   }) //this gets all of the groups from the DB
    
    this.userService.checkLogin()
    .then((result)=>{
      this.userId = result.userInfo._id;
      this.getUsersGroups()
    })
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })

  } //end onInit


  getUsersGroups(){
    this.apiGroup.getGroups(this.userId)
    .then((result: Groups[])=>{
      this.userGroups = result;
    })
    .catch((err)=>{
      console.log('error fetching users groups', err);
    })
  }

  groupState(groupId){
    this.apiGroup.currentGroup = groupId;
  }

  logInShow(){
    if(this.signUpState===true || this.newGroupState === true){
      this.signUpState = false;
      this.newGroupState = false;
    }
    this.logInState = !this.logInState;
  }
  signUpShow(){
    if(this.logInState===true || this.newGroupState == true){
      this.logInState = false;
      this.newGroupState = false;
    }
    this.signUpState = !this.signUpState;
  }
  newGroupShow(){
    if(this.logInState === true || this.newGroupState ===true){
      this.logInState = false;
      this.signUpState = false;
    }
    this.newGroupState = !this.newGroupState;
  }

  signUpSumbit(){
    this.userService.postSignUp(this.formCredentials)
    .then(()=>{
      this.signUpState = false;
      this.response.navigateByUrl('/');
    })
    .catch((err)=>{
      console.log('signup error');
      console.log(err);
    })
  }

  logInSubmit(){
    this.userService.postLogIn(this.formCredentials)
    .then(()=>{
      // this.isLoggedIn = true;
      this.logInState = false;
      this.response.navigateByUrl('/main');
    })
    .catch((err)=>{
      console.log('login error');
      console.log(err);
    })
  }

  logOutSubmit(){
    this.userService.getLogOut()
    .then(()=>{
      // this.isLoggedIn = false;
      this.response.navigateByUrl('/');
    })
    .catch((err)=>{
      console.log(err);
      console.log('log out error');
    })
  }

  groupFormSubmit(){
    this.apiGroup.newGroup(this.newGroup)
    .then(()=>{
      this.newGroupState = false;
      this.response.navigateByUrl(`/my-account/${this.userId}`);
    })
    .catch((err)=>{
      console.log(err, 'error form Submit')
    })
  }
}
