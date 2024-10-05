import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MapComponent } from '../../components/map/map.component';

interface IUserDecisions {
  description: string;
  stats: string;
  decision1: string;
  decision2: string;
  decision3: string;
  decision4: string;
}

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [TabsModule, MapComponent],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss',
})
export class UserDecisionsComponent{
  svgFill: string;

  constructor() {
    this.svgFill = 'rgba(0, 128, 0, 0.5)'; 
  }
  data: IUserDecisions = {
    description: 'This is a user decision.',
    stats: 'Stats of weather',
    decision1: 'Decision 1',
    decision2: 'Decision 2',
    decision3: 'Decision 3',
    decision4: 'Decision 4',
  };
}
