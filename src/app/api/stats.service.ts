import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatsService {
  constructor(private ajaxTruc: HttpClient) { }
  
  getStatsList(ids) {
    return this.ajaxTruc
      .patch(`http://localhost:3000/stat`,ids, {withCredentials: true})
      .toPromise();
  }
}

export class Stat {
  rating: Number; 
  seen: Number;
}