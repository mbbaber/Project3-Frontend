import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatsService {
  constructor(private ajaxTruc: HttpClient) { }
  getStatsList() {
    return this.ajaxTruc.get("http://localhost:3000/api/stats").toPromise();
  }
}

export class Stats {
  rating: Number; 
  seen: Number;
}