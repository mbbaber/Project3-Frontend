import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';

// this is backend base url
const BACKEND = environment.backUrl;

@Injectable()
export class GroupsService {

  currentGroup: string;
  userGroups: Group[];
  currentGroupData: Group;

  constructor(private ajaxTruc: HttpClient) { }

  getGroupsList() {
    return this.ajaxTruc
      .get(`${BACKEND}/a/api/groups`, { withCredentials: true })
      .toPromise();
  }

  getDetails(groupId: string) {
    return this.ajaxTruc
      .get(`${BACKEND}/a/group/${groupId}`)
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
    .get(`${BACKEND}/a/api/user-groups/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  deleteThisGroup(groupId, userId){
    return this.ajaxTruc
    // .put(`${BACKEND}/api/groups-of-the-user/${userId}/gr/${groupId}`, 
     .put(`${BACKEND}/a/api/delete/user/${userId}/group/${groupId}`,
    {new: true})
    .toPromise()
    .then((apiResponse: Group[])=>{
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  newGroup(groupCred: BeginningGroup){
    return this.ajaxTruc
    .post(`${BACKEND}/a/api/new-group`, groupCred, {withCredentials:true})
    .toPromise()
    .then((apiResponse:any)=>{  
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  createPrivateGroup(userId){
    return this.ajaxTruc
    .post(`${BACKEND}/a/api/private-group/${userId}`, {withCredentials: true})
    .toPromise()
    .then((apiResponse:any)=>{  
      this.userGroups = apiResponse;
      return apiResponse;
    })
  }

  addSubjectToGroup(subId, groupId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/api/gr/${groupId}/sb/${subId}`,
      {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      this.currentGroupData = apiResponse;
      return apiResponse;
    })
  }

  addThisUserToThisGroup(userId, groupId){
    // console.log('works')
    return this.ajaxTruc
    .put(`${BACKEND}/a/api/us/${userId}/gr/${groupId}`,
    {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      return apiResponse;
    })
  }

  deleteThisUserFromTheGroup(userId, groupId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/api/delete/user/${userId}/group/${groupId}`,
    {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      return apiResponse;
    })
  }

  delSubsOfThisGroupFromUser(userId, groupId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/api/delete/subs/${groupId}/user/${userId}`,
  {withCredentials: true})
  .toPromise()
  .then((apiResponse: any)=>{
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
  admin: string;
  users: Array<any>;
}

export class Groups {
  _id: string;
  name: string;
  users: any;
  admin: string
}