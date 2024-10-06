import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mapclickinfo',
  standalone: true,
  imports: [],
  templateUrl: './mapclickinfo.component.html',
  styleUrl: './mapclickinfo.component.scss'
})
export class MapclickinfoComponent {

  constructor(public dialogRef: MatDialogRef<MapclickinfoComponent>) {
  }

  startHandler(): void {
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
