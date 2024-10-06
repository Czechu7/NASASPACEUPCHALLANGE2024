import { Component, OnInit, signal } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MapComponent } from '../../components/map/map.component';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StatsService } from '../../service/stats.service';
import { QuestionsService } from '../../service/questions.service';
import { IDecision, IResQuestion } from '../../models/question';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-decisions',
  standalone: true,
  imports: [
    TabsModule,
    MapComponent,
    NgStyle,
    MatButtonModule,
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

  data!: IResQuestion;

  checkedOption!: IDecision;

  constructor(
    protected statsService: StatsService,
    private questionsService: QuestionsService,
    private router: Router
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
    setTimeout(() => {
      this.index.update((i) => i + 1);
      this.getQuestion();
    }, 1000);
  }

  checkOption(option: IDecision) {
    this.checkedOption = option;
  }

  progressColorHandler(value: number) {

  }

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
    const red = Math.floor((1 - this.statsService.stats().infrastructure / 100) * 255); // Czerwony
    const green = Math.floor((this.statsService.stats().infrastructure / 100) * 255); // Zielony
    return `rgb(${red}, ${green}, 0)`;
  }

  getSafetyColor() {
    const red = Math.floor((1 - this.statsService.stats().safety / 100) * 255); // Czerwony
    const green = Math.floor((this.statsService.stats().safety / 100) * 255); // Zielony
    return `rgb(${red}, ${green}, 0)`;
  }
}
