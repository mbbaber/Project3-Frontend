import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operator/toPromise';

@Injectable()
export class UserService {
  isLoggedIn: boolean;
  currentUser: User;
  constructor(
    public toBackEnd: HttpClient
  ) { }

  postSignUp(userCred: SignUpCredentials){
    return this.toBackEnd
    .post('http://localhost:3000/auth/signup',
    userCred,
    { withCredentials: true }
  )
    .toPromise()
    .then((apiResponse: any)=>{
      this.currentUser = apiResponse.userInfo;
      return apiResponse;
    })
  }

  postLogIn(userCred: LogInCredentials){
    return this.toBackEnd
    .post('http://localhost:3000/auth/login',
      userCred,
    {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      console.log('YOU ARE LOGGED IN');
      this.isLoggedIn = true;
      this.currentUser = apiResponse.userInfo;
      return apiResponse;
    })
  }

  checkLogin(){
    return this.toBackEnd
    .get('http://localhost:3000/auth/checklogin', {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      if(apiResponse.userInfo){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn)
      this.currentUser = apiResponse.userInfo;
      return apiResponse;
    })
  }

  getLogOut(){
    return this.toBackEnd
    .get('http://localhost:3000/auth/logout', {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      this.isLoggedIn = false;
      this.currentUser = apiResponse.userInfo;
      console.log('youre logged out', this.isLoggedIn)
      return apiResponse;
    })
  }

  getDataUser(userId){
    return this.toBackEnd
    .get(`http://localhost:3000/auth/user/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.currentUser = apiResponse.userInfo;
      return apiResponse;
    })
  }

}


export class User{
  username: String;
  _id: String;
  email: String
}

export class SignUpCredentials{
  username: String;
  password: String;
  email: String
}

export class LogInCredentials{
  username: String;
  password: String
}