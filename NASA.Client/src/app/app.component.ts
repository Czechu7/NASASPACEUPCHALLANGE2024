import { Component, NgModule } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WorldMapComponent } from './components/world-map/world-map.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'world-map', component: WorldMapComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page

];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StatisticsComponent,
    HomeComponent,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MatToolbar,
    SpinnerComponent,
    WorldMapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})


export class AppComponent {
  constructor(private router: Router) {}
  goToNextPage() {
    this.router.navigate(['/start']);
  }
  title = 'NASA.Client';
}
