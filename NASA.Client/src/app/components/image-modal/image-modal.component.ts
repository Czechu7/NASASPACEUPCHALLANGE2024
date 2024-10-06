import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss',
})
export class ImageModalComponent {
  imageUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imageUrl = data.imageUrl;
  }
}
