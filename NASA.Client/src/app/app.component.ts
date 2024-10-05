import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatToolbar } from '@angular/material/toolbar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MatToolbar,
    SpinnerComponent,
    HomeComponent
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
