import { Routes } from '@angular/router';
import { WorldMapComponent } from './components/world-map/world-map.component';
import { HomeComponent } from './home/home.component';
import { UserDecisionsComponent } from './shared/user-decisions/user-decisions.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'next-page',
    component: WorldMapComponent,
  },
  {
    path: 'user-decision',
    component: UserDecisionsComponent,
  },
];
