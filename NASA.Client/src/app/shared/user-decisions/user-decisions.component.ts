import { animate, style, transition, trigger } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
import { MapComponent } from '../../components/map/map.component';
import { IDecision, IResQuestion } from '../../models/question';
import { QuestionsService } from '../../service/questions.service';
import { StatsService } from '../../service/stats.service';
import { StatsDialogComponent } from '../../stats-dialog/stats-dialog.component';
import { RouterEnum } from '../../enums/router.enum';

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [
    TabsModule,
    MapComponent,
    NgStyle,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss',
  animations: [
    trigger('animateChange', [
      transition(':increment', [
        style({ color: 'green', transform: 'scale(1.1)' }),
        animate('0.5s linear', style({ color: '*', transform: 'scale(1)' })),
      ]),
      transition(':decrement', [
        style({ color: 'red', transform: 'scale(1.1)' }),
        animate('0.5s linear', style({ color: '*', transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class UserDecisionsComponent implements OnInit {
  svgFill: string;

  openDialog(): void {
    this.dialog.open(StatsDialogComponent);
  }

  data!: IResQuestion;

  checkedOption!: IDecision;

  bsModalRef!: BsModalRef;

  constructor(
    protected statsService: StatsService,
    private questionsService: QuestionsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.svgFill = 'rgba(0, 128, 0, 0.5)';
  }

  index = signal<number>(1);

  getQuestion() {
    this.questionsService.getQuestion(this.index()).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: () => {
        this.router.navigate([RouterEnum.Statistics]);
      },
    });
  }

  openModal(imageUrl: number) {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
    });
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  nextRounde() {
    if (!this.checkedOption) {
      return;
    }

    const isZero =
      this.statsService.stats().budget === 0 ||
      this.statsService.stats().infrastructure === 0 ||
      this.statsService.stats().morale === 0 ||
      this.statsService.stats().safety === 0;

    if (isZero) {
      this.router.navigate([RouterEnum.Statistics]);
      return;
    }
    this.statsService.nextRounde(this.checkedOption);
    setTimeout(() => {
      this.index.update((i) => i + 1);
      this.getQuestion();
    }, 1000);
  }

  checkOption(option: IDecision) {
    this.checkedOption = option;
  }

  progressColorHandler(value: number) {}

  getMoraleColor() {
    const red = Math.floor((1 - this.statsService.stats().morale / 100) * 255); // Czerwony
    const green = Math.floor((this.statsService.stats().morale / 100) * 255); // Zielony
    return `rgb(${red}, ${green}, 0)`;
  }

  getBudgetColor() {
    const red = Math.floor((1 - this.statsService.stats().budget / 100) * 255); // Czerwony
    const green = Math.floor((this.statsService.stats().budget / 100) * 255); // Zielony
    return `rgb(${red}, ${green}, 0)`;
  }

  getInfrastructureColor() {
    const red = Math.floor(
      (1 - this.statsService.stats().infrastructure / 100) * 255
    ); // Czerwony
    const green = Math.floor(
      (this.statsService.stats().infrastructure / 100) * 255
    ); // Zielony
    return `rgb(${red}, ${green}, 0)`;
  }

  getSafetyColor() {
    const red = Math.floor((1 - this.statsService.stats().safety / 100) * 255); // Czerwony
    const green = Math.floor((this.statsService.stats().safety / 100) * 255); // Zielony
    return `rgb(${red}, ${green}, 0)`;
  }
}
