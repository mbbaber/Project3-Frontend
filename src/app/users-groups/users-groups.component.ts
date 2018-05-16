import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Groups, GroupsService } from '../api/groups.service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {

  userData: any;
  userId: String;

  search: String ="";
  groupId: String;
  groups: Groups[];
  userGroups: Groups[];

  constructor(
    public userService: UserService,
    public request: ActivatedRoute,
    public response: Router,
    public apiGroup: GroupsService
  ) { }

  ngOnInit() {

    this.userService.checkLogin()
    .then((result: any)=>{
      this.userData = result;
      this.apiGroup.getGroups(result.userInfo._id)
      .then((result: Groups[])=>{
        this.groups = result;
      })
      .catch((err)=>{
        console.log('error fetching users groups', err);
      })
    })
    .catch((err)=>{
      console.log('App login check error');
      console.log(err);
    })

    
  }

  groupState(groupId){
    this.apiGroup.currentGroup = groupId;
  }

  getUserData(){
    this.userService.getDataUser(this.userId)
    .then((result: any)=>{
      this.userData = result;

      console.log(this.userData);
    })
    .catch((err)=>{
      console.log("error fetching user data");
      console.log(err);
    })
  }
  
}
