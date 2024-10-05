import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MapComponent } from '../../components/map/map.component';
import { NgStyle } from '@angular/common';

interface IUserDecisions {

  description: string;
  forecast: string;
  decision1: string;
  decision2: string;
  decision3: string;
  decision4: string;
}

interface IStats {
    budget: number;
    safety: number;
    infrastructure: number;
    morale: number;
}

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [TabsModule, MapComponent, NgStyle],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss',
})
export class UserDecisionsComponent {
  svgFill: string;
  stats:IStats = { budget: 100, safety: 60, infrastructure: 70, morale: 90 }
  data: IUserDecisions = {
    description: 'This is a user decision.',
    forecast: 'Stats of weather',
    decision1: 'Decision 1',
    decision2: 'Decision 2',
    decision3: 'Decision 3',
    decision4: 'Decision 4',
  };

  constructor() {
    this.svgFill = 'rgba(0, 128, 0, 0.5)';
  }


}
