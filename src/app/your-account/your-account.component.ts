import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../api/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.css']
})
export class YourAccountComponent implements OnInit {

  userData: User = this.userService.currentUser;
  userId: String ;

  constructor(
    public userService: UserService,
    public request: ActivatedRoute,
    public response: Router
  ) { }

  ngOnInit() {
    this.userService.checkLogin()
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })

    this.request.paramMap
      .subscribe((myParams) => {
        this.userId = myParams.get('userId');
      })

    this.getUserData()
  }

  getUserData(){
    this.userService.getDataUser(this.userId)
    .then((result: User)=>{
      this.userData = result;
      console.log(this.userData);
    })
    .catch((err)=>{
      console.log("error fetching user data");
      console.log(err);
    })
  }
}
