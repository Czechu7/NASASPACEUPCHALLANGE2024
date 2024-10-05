import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

interface IUserDecisions {
  stats: {
    budget: number;
    safety: number;
    infrastructure: number;
    morale: number;
  };
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
  imports: [TabsModule],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss',
})
export class UserDecisionsComponent {
  svgFill: string;

  constructor() {
    this.svgFill = 'rgba(0, 128, 0, 0.5)';
  }
  data: IUserDecisions = {
    stats: { budget: 100, safety: 60, infrastructure: 70, morale: 90 },
    description: 'This is a user decision.',
    forecast: 'Stats of weather',
    decision1: 'Decision 1',
    decision2: 'Decision 2',
    decision3: 'Decision 3',
    decision4: 'Decision 4',
  };
}
