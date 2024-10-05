import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbar } from '@angular/material/toolbar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { WorldMapComponent } from './components/world-map/world-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
  title = 'NASA.Client';
}
