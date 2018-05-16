import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  userData: User;
  userId: string;
  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.checkLogin()
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })

    this.actRoute.parent.paramMap
      .subscribe((myParams) => {
        this.userId = myParams.get('userId');
        console.log(this.userId)
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
