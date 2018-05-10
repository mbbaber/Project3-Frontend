import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { toPromise } from 'rxjs/operator/toPromise';

@Injectable()
export class SubjectsService {
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
}

export class Subjects {
  name: string; 
  keyword: string;
}