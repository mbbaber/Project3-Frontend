import { Component } from '@angular/core';
import { GroupsService, Groups, BeginningGroup } from './api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewSubject, SubjectsService } from './api/subjects.service';
import { User, SignUpCredentials, UserService } from './api/user.service';
import { FormsStateService } from './api/forms-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // for error messages
  isErrMsg: boolean = false;

  
  displayMsg: string;


  groupsId: string;
  groups: Groups[];

  userId: string;
  currentUser: User;
  userGroups: Groups[];

  logInState: boolean = false;
  signUpState: boolean = false;
  newGroupState: boolean = false;
  newCardsState: boolean = false;

  formCredentials: SignUpCredentials = new SignUpCredentials();
  newGroup: BeginningGroup = new BeginningGroup();
  privateGroup: BeginningGroup = new BeginningGroup();
  newSetOfCards: NewSubject = new NewSubject();

  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    private resTruc: Router,
    public userService: UserService,
    public response: Router,
    public apiSub: SubjectsService,
    public popUps: FormsStateService
  ){ }

  ngOnInit() {
    
    this.userService.checkLogin()
    .then((result)=>{
      this.userId = result.userInfo._id;
      this.currentUser = result.userInfo;
      this.getUsersGroups(this.userId)
    })
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })

  } //end onInit


  getUsersGroups(userId){
    this.apiGroup.getGroups(userId)
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
//***************************STATES OF POP UP WINDOWS*************** */
  logInShow(){
    this.formCredentials.username = "";
    this.formCredentials.password = "";
    if(this.signUpState===true || this.newGroupState === true || this.newCardsState === true ){
      this.signUpState = false;
      this.newGroupState = false;
      this.newCardsState = false;
    }
    this.logInState = !this.logInState;
  }
  signUpShow(){
    this.formCredentials.username = "";
    this.formCredentials.password = "";
    this.formCredentials.email = "";
    if(this.logInState===true || this.newGroupState == true || this.newCardsState === true){
      this.logInState = false;
      this.newGroupState = false;
      this.newCardsState = false;
    }
    this.signUpState = !this.signUpState;
  }
  newGroupShow(){
    this.newGroup.name = "";
    if(this.logInState === true || this.newGroupState ===true || this.newCardsState === true){
      this.logInState = false;
      this.signUpState = false;
      this.newCardsState = false;
    }
    this.newGroupState = !this.newGroupState;
  }
  newSetShow(){
    this.newSetOfCards.name = "";
    if(this.logInState === true || this.newGroupState ===true || this.signUpState ===true){
      this.logInState = false;
      this.signUpState = false;
      this.newGroupState = false;
    }
    this.newCardsState = !this.newCardsState;
  }

//***************************STATES OF POP UP WINDOWS- FINISHED *************** */
  signUpSumbit(){
    this.userService.postSignUp(this.formCredentials)
    .then((newUser)=>{
      this.isErrMsg = false;
      this.signUpState = false;
      this.apiGroup.createPrivateGroup(newUser.userInfo._id)
      this.response.navigateByUrl('/');
    })
    .catch((err)=>{
      console.log('signup error');
      //changed this for printing error messages
      console.log(err.error.message)
      this.isErrMsg = true;
      this.displayMsg = err.error.message;
      console.log(err);
    })
  }

  logInSubmit(){
    this.userService.postLogIn(this.formCredentials)
    .then((result)=>{
      this.getUsersGroups(result.userInfo._id);
      this.userId = result.userInfo._id;
      this.currentUser = result.userInfo;
      this.logInState = false;
      this.response.navigateByUrl('/main');
      

    })
    .catch((err)=>{
      console.log('login error');
      console.log(err.error.message)
      this.isErrMsg = true;
      this.displayMsg = err.error.message;
      console.log(err);
    })
  }

  logOutSubmit(){
    this.userService.getLogOut()
    .then(()=>{
      // this.isLoggedIn = false;
      this.currentUser = undefined;
      this.response.navigateByUrl('/');
    })
    .catch((err)=>{
      console.log(err);
      console.log('log out error');
    })
  }

  groupFormSubmit(){
    this.apiGroup.newGroup(this.newGroup)
    .then((result)=>{
      this.getUsersGroups(this.userId);
      this.newGroupState = false;
      this.response.navigateByUrl(`/group/${result._id}`);
      console.log('new group?', result)
    })
    .catch((err)=>{
      console.log(err, 'error form Submit')
    })
  }
  
  subjectFormSubmit(){
    this.apiSub.newSub(this.newSetOfCards)
    .then((result)=>{
      console.log(result)
      this.newCardsState = false;
      this.response.navigateByUrl(`/new-subject/${result._id}`);
    })
    .catch((err)=>{
      console.log(err, 'error form Submit')
    })
  }
}
