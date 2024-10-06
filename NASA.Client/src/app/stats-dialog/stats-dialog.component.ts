import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-stats-dialog',
  standalone: true,
  imports: [TabsModule, MatButtonModule,MatDialogModule,MatTooltipModule,],
  templateUrl: './stats-dialog.component.html',
  styleUrl: './stats-dialog.component.scss'
})
export class StatsDialogComponent {

}
