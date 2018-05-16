import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService, Groups } from '../../api/groups.service';

@Component({
  selector: 'app-your-groups',
  templateUrl: './your-groups.component.html',
  styleUrls: ['./your-groups.component.css']
})
export class YourGroupsComponent implements OnInit {

  userData: User;
  userId: string;
  userGroups: Groups[] = [];
  search: string = "";
  
  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public apiGroup: GroupsService,
    public response: Router
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
      })

    this.getUserData()
    this.getUsersGroups()

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

  getUsersGroups(){
    this.apiGroup.getGroups(this.userId)
    .then((result: Groups[])=>{
      this.userGroups = result;
    })
    .catch((err)=>{
      console.log('error fetching users groups', err);
    })
  }

  deleteGroup(groupId, userId){
    this.apiGroup.deleteThisGroup(groupId, userId)
    .then(()=>{
      // this.userGroups = result;
      // console.log(result);
      this.getUsersGroups();
      this.apiGroup.delSubsOfThisGroupFromUser(userId, groupId)
      this.response.navigateByUrl(`/my-account/${userId}/groups`)
    })
    .catch((err)=>{
      console.log('error deleting group', err);
    })
  }
}
