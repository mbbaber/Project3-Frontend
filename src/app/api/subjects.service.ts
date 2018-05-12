import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { toPromise } from 'rxjs/operator/toPromise';

@Injectable()
export class SubjectsService {

  userSubs: Subject[];
  constructor(private ajaxTruc: HttpClient) { }
  
  getSubjectsList(groupId) {
    return this.ajaxTruc
      .get(`http://localhost:3000/group/${groupId}`)
      .toPromise();
  }

  getSubDetails(subjectId){
    return this.ajaxTruc 
      .get(`http://localhost:3000/subject/${subjectId}`)
      .toPromise()
  }

  getSubs(userId){
    return this.ajaxTruc
    .get(`http://localhost:3000/subject/user-subs/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.userSubs = apiResponse;
      return apiResponse;
    })
  }

  deleteThisSub(subId, userId){
    return this.ajaxTruc
    .put(`http://localhost:3000/subject/subs-of-the-user/${userId}/gr/${subId}`, {new: true})
    .toPromise()
    .then((apiResponse: Subject[])=>{
      this.userSubs = apiResponse;
      return apiResponse;
    })
  }
}

export class Subject {
  _id: string;
  cards: Card[];
  name: string; 
  keyword: string;
}

export class Card {
  _id: string;
  front: string;
  back: string;
}