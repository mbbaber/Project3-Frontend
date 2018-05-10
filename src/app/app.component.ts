import { Component } from '@angular/core';
import { UserService, SignUpCredentials } from './services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logInState: boolean = false;
  signUpState: boolean = false;
  formCredentials: SignUpCredentials = new SignUpCredentials();

  title = 'app';
  constructor(
    public userService: UserService,
    public response: Router
  ){}

  ngOnInit(){
    this.userService.checkLogin()
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })
  }

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
      this.response.navigateByUrl('/');
    })
    .catch((err)=>{
      console.log(err);
      console.log('log out error');
    })
  }
}
