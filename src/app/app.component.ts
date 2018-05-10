import { Component } from '@angular/core';
import { GroupsService, Groups } from './api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  groupsId: string;
  groups: Groups[];

  logInState: boolean = false;
  signUpState: boolean = false;

  title = 'app';
  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    private resTruc: Router
  ){ }

  ngOnInit() {
    this.apiGroup.getGroupsList()
      .then((result: Groups[]) => {
        this.groups = result;
      })
      .catch(err => {
        console.log(err)
      })
  }
  // addGroup(id, groupId) {



  logInShow(){
    this.logInState = !this.logInState;
  }
  signUpShow(){
    this.signUpState = !this.signUpState;
  }
}
