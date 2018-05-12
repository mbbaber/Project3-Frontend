import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { SubjectsService, Subject, Card } from '../../api/subjects.service';

@Component({
  selector: 'app-your-subjects',
  templateUrl: './your-subjects.component.html',
  styleUrls: ['./your-subjects.component.css']
})
export class YourSubjectsComponent implements OnInit {

  userData: User;
  userId: string;
  userSubs: Subject[] = [];
  search: string = "";
  
  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public apiGroup: SubjectsService,
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
    this.getUsersSubjects()

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

  getUsersSubjects(){
    this.apiGroup.getSubs(this.userId)
    .then((result: Subject[])=>{
      this.userSubs = result;
    })
    .catch((err)=>{
      console.log('error fetching users groups', err);
    })
  }

  deleteSubject(subId, userId){
    this.apiGroup.deleteThisSub(subId, userId)
    .then((result)=>{
      this.userSubs = result;
      console.log(result);
      this.response.navigateByUrl(`/my-account/${userId}/subjects`)
    })
    .catch((err)=>{
      console.log('error deleting group', err);
    })
  }
}
