import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatsService {
  constructor(private ajaxTruc: HttpClient) { }
  
  getStatsList(statId) {
    return this.ajaxTruc
      .get(`http://localhost:3000/stat}`)
      .toPromise();
  }
}

export class Stat {
  rating: Number; 
  seen: Number;
}