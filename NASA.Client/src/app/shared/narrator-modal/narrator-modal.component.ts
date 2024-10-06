import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-narrator-modal',
  standalone: true,
  imports: [],
  templateUrl: './narrator-modal.component.html',
  styleUrl: './narrator-modal.component.scss'
})
export class NarratorModalComponent implements OnInit {
  
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
