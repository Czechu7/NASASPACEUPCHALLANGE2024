import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbar } from '@angular/material/toolbar';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MatToolbar,
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router) {}
goToNextPage() {
  this.router.navigate(['/next-page']);
}
  title = 'NASA.Client';
}
