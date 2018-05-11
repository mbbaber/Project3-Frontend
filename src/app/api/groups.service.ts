import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupsService {

  currentGroup: string;

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
    return result
  })
  .catch((err)=>{
    console.log("get detais group service error", err);
  })
  }
}

export class Groups {
  _id: string;
  name: string;
}