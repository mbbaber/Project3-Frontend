import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Subject, Card } from './subjects.service';
import { Group } from './groups.service';
import { User } from '../api/user.service';
import {environment} from '../../environments/environment';

// Serive allows us to get additional data or do operations outside of the frontend
// i.e. sending a request to mongo to get data from DB

const BACKEND = environment.backUrl

@Injectable()
export class StatsService {
  // HttpClient is an object (which belongs to libary @angular/common/http ) able to make REST calls because js is unable to speak to the backend
  // if we used js, we'd have to write all the GET POST etc ourselves
  // FYI .httpClient was formally called ajaxTruc in class, but the name didn't make sense to me.
  constructor(private httpClient: HttpClient) { }
  
  getStatsList(ids) {
    return this.httpClient
      .patch(`${BACKEND}/stat`,ids, {withCredentials: true})
      .toPromise();
  }

  getAllStatsForUser(groupId, subjectId) {
    return this.httpClient
      .get(`${BACKEND}/stat/${groupId}/${subjectId}`, {withCredentials: true})
      .toPromise();
  }

  getAllStatsForUserById(groupId, subjectId, userId) {
    return this.httpClient
      .get(`${BACKEND}/stat/${groupId}/${subjectId}/${userId}`, {withCredentials: true})
      .toPromise();
  }

    
  getAllStatsForUsersInGroup(groupId) {
    return this.httpClient
      .get(`${BACKEND}/group-info/${groupId}`, {withCredentials: true})
      .toPromise();
}

};






export class Stat {
  card: string;
  user: User;
  group: Group;
  subject: Subject;
  rating: number; 
  seen: number;
}

export class GroupStats {
  users: any[];
}