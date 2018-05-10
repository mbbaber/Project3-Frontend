import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logInState: boolean = false;
  signUpState: boolean = false;

  title = 'app';
  constructor(
  ){

  }

  logInShow(){
    this.logInState = !this.logInState;
  }
  signUpShow(){
    this.signUpState = !this.signUpState;
  }
}
