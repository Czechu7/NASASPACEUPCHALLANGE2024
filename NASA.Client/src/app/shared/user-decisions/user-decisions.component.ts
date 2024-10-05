import { Component } from '@angular/core';

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss'
})
export class UserDecisionsComponent {
  data = {description: 'This is a user decision.', stats: 'Stats of weather', decision1: 'Decision 1', decision2: 'Decision 2', decision3: 'Decision 3', decision4: 'Decision 4'};

}
