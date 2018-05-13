import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

// this is backend base url
const BACKEND = "http://localhost:3000";

@Injectable()
export class GroupsService {

  currentGroup: string;
  userGroups: Group[];

  constructor(private ajaxTruc: HttpClient) { }

  getGroupsList() {
    return this.ajaxTruc
      .get(`${BACKEND}/api/groups`, { withCredentials: true })
      .toPromise();
  }

  getDetails(groupId: string) {
    return this.ajaxTruc
      .get(`${BACKEND}/group/${groupId}`)
      .toPromise()
      .then((result: any) => {
        this.currentGroup = result._id
        return result
      })
      .catch((err) => {
        console.log("get detais group service error", err);
      })
  }

  getGroups(userId){
    return this.ajaxTruc
    .get(`${BACKEND}/api/user-groups/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  deleteThisGroup(groupId, userId){
    return this.ajaxTruc
    .put(`${BACKEND}/api/groups-of-the-user/${userId}/gr/${groupId}`, {new: true})
    .toPromise()
    .then((apiResponse: Group[])=>{
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  newGroup(groupCred: BeginningGroup){
    return this.ajaxTruc
    .post(`${BACKEND}/api/new-group`, groupCred, {withCredentials:true})
    .toPromise()
    .then((apiResponse:any)=>{  
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }
}

export class Group {
  _id: string;
  name: string;
  users: any;
  admin: string
}

export class BeginningGroup{
  name: string;
  admin: string
}