import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Roll} from "../../core/models/roll";
import {RollResultRow} from "../../core/models/roll-result-row";
import {RollDistribution} from "../../core/models/roll-distribution";
import {Simulation} from "../../core/models/simulation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  diceCount: number;
  sideCount: number;
  rollCount: number;

  diceCountDistribution: number;
  sideCountDistribution: number;

  sides: Array<number> = [6, 8, 10, 12, 20, 100];

  rollResultRowMap: Map<string, number>;
  rollDistributionList: RollDistribution[] = [];
  simulationList: Simulation[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getHistory();
  }

  simulate(rollCount: number, diceCount: number, sideCount: number) {
    let roll = {} as Roll;
    roll.roll_count = rollCount;
    roll.dice_count = diceCount;
    roll.side_count = sideCount;

    this.apiService.simulate(roll)
      .subscribe(response =>  {
        this.rollResultRowMap = response.rolled_results;
        this.getDistribution(roll.dice_count, roll.side_count)
        this.getHistory();
      });
  }

  getDistribution(diceCount: number, sideCount: number) {
    this.apiService.getDistribution(diceCount.toString(), sideCount.toString())
      .subscribe(response => this.rollDistributionList=response);
  }

  getHistory() {
    this.apiService.getHistory().subscribe(response => this.simulationList = response);
  }
}
