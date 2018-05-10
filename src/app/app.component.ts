import { Component } from '@angular/core';
import { GroupsService, Groups } from './api/groups.service';
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
  // isLoggedIn: boolean = false;
  logInState: boolean = false;
  signUpState: boolean = false;
  formCredentials: SignUpCredentials = new SignUpCredentials();

  title = 'app';
  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    private resTruc: Router,
    public userService: UserService,
    public response: Router
  ){ }

  ngOnInit() {
    this.apiGroup.getGroupsList()
      .then((result: Groups[]) => {
        this.groups = result;
      })
      .catch(err => {
        console.log(err)
      })
   
    this.userService.checkLogin()
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })
  }
  // addGroup(id, groupId) {



  logInShow(){
    if(this.signUpState===true){
      this.signUpState = false;
    }
    this.logInState = !this.logInState;
  }
  signUpShow(){
    if(this.logInState===true){
      this.logInState = false;
    }
    this.signUpState = !this.signUpState;
  }

  signUpSumbit(){
    this.userService.postSignUp(this.formCredentials)
    .then(()=>{
      this.signUpState = false;
      this.response.navigateByUrl('/main');
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

  yourAccount(userId){
    this.userService.getDataUser(userId)
    .then((result)=>{
      // this.isLoggedIn = false;
      console.log(result);
      this.response.navigateByUrl('/my-account');
    })
    .catch((err)=>{
      console.log(err);
      console.log('log out error');
    })
  }
}
