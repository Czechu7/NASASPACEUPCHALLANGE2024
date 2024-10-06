import { Component } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterEnum } from '../../enums/router.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatMenu],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  RouterEnum = RouterEnum;

  goToHOME() {
    this.router.navigate([RouterEnum.Home]);
  }
}
