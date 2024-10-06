import { Component, OnInit, signal } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MapComponent } from '../../components/map/map.component';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StatsService } from '../../service/stats.service';
import { QuestionsService } from '../../service/questions.service';
import { IDecision, IResQuestion } from '../../models/question';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StatsDialogComponent } from '../../stats-dialog/stats-dialog.component';

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [TabsModule, MapComponent, NgStyle, MatButtonModule,MatDialogModule],
  templateUrl: './user-decisions.component.html',
  styleUrl: './user-decisions.component.scss',
})
export class UserDecisionsComponent implements OnInit {
  svgFill: string;  

  openDialog(): void {
    this.dialog.open(StatsDialogComponent);
  }

  data!: IResQuestion;

  checkedOption!: IDecision;

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
        this.router.navigate(['/statistics']);
      },
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
      this.router.navigate(['/statistics']);
      return;
    }
    this.statsService.nextRounde(this.checkedOption);
    this.index.update((i) => i + 1);
    this.getQuestion();
  }

  checkOption(option: IDecision) {
    this.checkedOption = option;
  }
}
