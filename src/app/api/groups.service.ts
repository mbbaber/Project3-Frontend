import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupsService {

  currentGroup: string;
  userGroups: Groups[];

  constructor(private ajaxTruc: HttpClient) { }
  getGroupsList() {
    // this is backend url
    return this.ajaxTruc.get("http://localhost:3000/api/groups", {withCredentials: true}).toPromise();
  }
  getDetails(groupId){
    return this.ajaxTruc 
  .get(`http://localhost:3000/group/${groupId}`)
  .toPromise()
  .then((result: any)=>{
    console.log("AAAAAAAAAAAAAAAAAAAAAA", result)
    this.currentGroup = result._id
    return result;
  })
  .catch((err)=>{
    console.log("get detais group service error", err);
  })
  }

  getGroups(userId){
    return this.ajaxTruc
    .get(`http://localhost:3000/api/user-groups/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  deleteThisGroup(groupId, userId){
    return this.ajaxTruc
    .put(`http://localhost:3000/api/groups-of-the-user/${userId}/gr/${groupId}`, {new: true})
    .toPromise()
    .then((apiResponse: Groups[])=>{
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  newGroup(groupCred: BeginningGroup){
    return this.ajaxTruc
    .post('http://localhost:3000/api/new-group',
    groupCred,
    {withCredentials:true})
    .toPromise()
    .then((apiResponse:any)=>{  
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }
}

export class Groups {
  _id: string;
  name: string;
  users: any;
  admin: string
}

export class BeginningGroup{
  name: string;
  admin: string
}