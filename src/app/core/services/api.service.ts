import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Roll} from "../models/roll";
import {RollResults} from "../models/roll-results";
import {RollDistribution} from "../models/roll-distribution";
import {Simulation} from "../models/simulation";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL =  'http://localhost:8080/dice-simulator';

  constructor(private http: HttpClient) { }

  simulate(roll: Roll): Observable<RollResults> {
    let url = this.SERVER_URL + '/roll';

    return this.http.post<RollResults>(url, roll);
  }

  getDistribution(diceCount: string, sideCount: string): Observable<RollDistribution[]> {
    let url = this.SERVER_URL + '/simulation/distribution';

    let params = new HttpParams()
      .set('dice_count', diceCount)
      .set('side_count', sideCount);

    return this.http.get<RollDistribution[]>(url, {params: params});
  }

  getHistory(): Observable<Simulation[]> {
    let url = this.SERVER_URL + '/simulation/history';

    return this.http.get<Simulation[]>(url);
  }
}
