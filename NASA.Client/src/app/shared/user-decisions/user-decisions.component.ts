import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MapComponent } from '../../components/map/map.component';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StatsService } from '../../service/stats.service';

interface IUserDecisions {
  description: string;
  forecast: string;
  decision1: string;
  decision2: string;
  decision3: string;
  decision4: string;
}

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [TabsModule, MapComponent, NgStyle, MatButtonModule],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss',
})
export class UserDecisionsComponent {
  svgFill: string;

  data: IUserDecisions = {
    description: 'This is a user decision.',
    forecast: 'Stats of weather',
    decision1: 'Decision 1',
    decision2: 'Decision 2',
    decision3: 'Decision 3',
    decision4: 'Decision 4',
  };

  constructor(protected statsService: StatsService) {
    this.svgFill = 'rgba(0, 128, 0, 0.5)';
  }
}
