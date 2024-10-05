import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-narrator-modal',
  standalone: true,
  imports: [],
  templateUrl: './narrator-modal.component.html',
  styleUrl: './narrator-modal.component.scss'
})
export class NarratorModalComponent {
  
  constructor(public dialogRef: MatDialogRef<NarratorModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
