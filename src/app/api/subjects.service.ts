import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { toPromise } from 'rxjs/operator/toPromise';
import {environment} from '../../environments/environment';

const BACKEND= environment.backUrl;

@Injectable()
export class SubjectsService {
  allSubs: Subject[];

  subToSave: newSubSave;
  cardOfThisSub: Card[];
  kewordsOfThisSub: Array<string>;
  subsAdmin: any;
  userSubs: Subject[];
  constructor(
    private ajaxTruc: HttpClient) { }
  
  getSubjectsList(groupId) {
    return this.ajaxTruc
      .get(`${BACKEND}/a/group/${groupId}`)
      .toPromise();
  }

  getSubDetails(subjectId){
    return this.ajaxTruc 
      .get(`${BACKEND}/a/subject/${subjectId}`)
      .toPromise()
  }

  getSubs(userId){
    return this.ajaxTruc
    .get(`${BACKEND}/a/subject/user-subs/${userId}`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.userSubs = apiResponse;
      return apiResponse;
    })
  }

  deleteThisSub(subId, userId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/subject/subs-of-the-user/${userId}/gr/${subId}`, {new: true})
    .toPromise()
    .then((apiResponse: Subject[])=>{
      this.userSubs = apiResponse;
      return apiResponse;
    })
  }

  newSub(subCred: NewSubject){
    return this.ajaxTruc
    .post(`${BACKEND}/a/subject/new-subject`,
    subCred,
    {withCredentials: true})
    .toPromise()
    .then((apiResponse:any)=>{  
      this.subToSave = apiResponse;
      // console.log(apiResponse)
      return apiResponse;
    })
  }

  getSubInfo(subId){
    return this.ajaxTruc
    .get(`${BACKEND}/a/subject/${subId}`)
    .toPromise()
    .then((apiResponse: any)=>{
     
      this.subsAdmin = apiResponse.admin
      this.cardOfThisSub = apiResponse.cards;
      this.kewordsOfThisSub = apiResponse.keywords;
      this.subToSave = apiResponse;
      // console.log(apiResponse)
      return apiResponse;
    })
  }

  getAllTheSubjects(){
    return this.ajaxTruc
    .get(`${BACKEND}/a/subject/all-subjects`)
    .toPromise()
    .then((apiResponse: any)=>{
      this.allSubs = apiResponse;
      return apiResponse;
    })
  }

  getCardInfo(cardInfo: NewCard, subId: string){
    return this.ajaxTruc
    .put(`${BACKEND}/a/subject/add-card/${subId}`,
        cardInfo,
      {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      this.subToSave = apiResponse;
      // console.log(apiResponse)
      return apiResponse;
    })
  }

  deleteThisCard(card, subjectId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/subject/sub/${subjectId}/card/${card}`,
    card,
    {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      this.subToSave = apiResponse;
      // console.log(apiResponse)
      return apiResponse;
    })
  }
  
  postThisKeyword(keyword, subId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/subject/add-keyword/${subId}/${keyword}`, {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      return apiResponse;
    })
  }
 
  deleteThisKeyword(keyword, subId){
    return this.ajaxTruc
    .put(`${BACKEND}/a/subject/delete-keyword/${subId}/${keyword}`, {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      return apiResponse;
    })
  }
 
  sendMessage(message){
    return this.ajaxTruc
    .post(`${BACKEND}/a/api/process-message`, message, {withCredentials: true})
    .toPromise()
    .then((apiResponse: any)=>{
      return apiResponse;
    })
  }

}

export class Subject {
  _id: string;
  cards: Card[];
  name: string; 
  keywords: Array<string>;
}

export class Card {
  _id: string;
  front: string;
  back: string;
}

export class NewCard {
  front: string;
  back: string;
}

export class NewSubject{
  name: string;
  admin: string;
  cards: Array<any>
}

export class newSubSave{
  _id: string;
  name: string;
  admin: string;
  cards: Array<any>
}

export class chooseSub{
  name: string
}

export class email{
  sender: string;
  senderEmail: string;
  message: string;
  email: string
}