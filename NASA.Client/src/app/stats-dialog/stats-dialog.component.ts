import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-stats-dialog',
  standalone: true,
  imports: [TabsModule],
  templateUrl: './stats-dialog.component.html',
  styleUrl: './stats-dialog.component.scss'
})
export class StatsDialogComponent {

}
