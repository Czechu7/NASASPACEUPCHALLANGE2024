import { Routes } from '@angular/router';
import { WorldMapComponent } from './components/world-map/world-map.component';
import { HomeComponent } from './home/home.component';
import { UserDecisionsComponent } from './shared/user-decisions/user-decisions.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RouterEnum } from './enums/router.enum';
import { PlanetNotFoundComponent } from './components/planet-not-found/planet-not-found.component';

export const routes: Routes = [
  {
    path: RouterEnum.Home,
    component: HomeComponent,
  },
  {
    path: RouterEnum.NextPage,
    component: WorldMapComponent,
  },
  {
    path: RouterEnum.Game,
    component: UserDecisionsComponent,
  },
  {
    path: RouterEnum.Statistics,
    component: StatisticsComponent,
  },
  {
    path: RouterEnum.Home,
    component: HomeComponent,
  },

  {
    path: RouterEnum.NASA_INFORMATION,
    component: PlanetNotFoundComponent,
  },
  {
    path: RouterEnum.COMMUNITY,
    component: PlanetNotFoundComponent,
  },
  {
    path: RouterEnum.CONTACT,
    component: PlanetNotFoundComponent,
  },
  {
    path: RouterEnum.RESOURCES,
    component: PlanetNotFoundComponent,
  },
  {
    path: RouterEnum.RESOURCES,
    component: PlanetNotFoundComponent,
  },
  {
    path: RouterEnum.SOLUTIONS,
    component: PlanetNotFoundComponent,
  },
  {
    path: RouterEnum.NOT_FOUND,
    component: PlanetNotFoundComponent,
  },
];
