import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupsService {
  constructor(private ajaxTruc: HttpClient) { }
  getGroupsList() {
    // this is backend url
    return this.ajaxTruc.get("http://localhost:3000/api/groups", {withCredentials: true}).toPromise();
  }
  getDetails(groupId){
    return this.ajaxTruc 
  .get(`http://localhost:3000/group/${groupId}`)
  .toPromise()
  }
}

export class Groups {
  name: string;
}