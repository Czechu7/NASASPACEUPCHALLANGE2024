import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NarratorModalComponent } from '../narrator-modal/narrator-modal.component';

@Component({
  selector: 'app-tutorial-modal',
  standalone: true,
  imports: [],
  templateUrl: './tutorial-modal.component.html',
  styleUrl: './tutorial-modal.component.scss'
})
export class TutorialModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<NarratorModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    document.addEventListener("click", (event) => {
      this.closeModal();
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
