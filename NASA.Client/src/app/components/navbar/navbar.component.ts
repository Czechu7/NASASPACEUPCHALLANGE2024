import { Component } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { NasaInformationComponent } from './nasa-information/nasa-information.component';
//import { SolutionsComponent } from './solutions/solutions.component';
//import { CommunityComponent } from './community/community.component';
//import { ResourcesComponent } from './resources/resources.component';
//import { ContactComponent } from './contact/contact.component';
/*
const routes: Routes = [
  { path: 'nasa-information', component: NasaInformationComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/nasa-information', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatMenu],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
