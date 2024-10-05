import { Injectable, signal } from '@angular/core';
import { IStats } from '../models/stat';

import { IDecision } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  stats = signal<IStats>({
    budget: 60,
    safety: 80,
    infrastructure: 70,
    morale: 90,
  });

  day = signal<number>(1);
  round = signal<number>(1);

  updatePoints(stats: IStats) {
    this.stats.set(stats);
  }

  nextRounde(checkedOption: IDecision) {
    this.round.update((r) => r + 1);

    if (this.round() % 4 === 0) {
      this.day.update((d) => d + 1);
    }

    const newStats = {
      budget:
        this.stats().budget + checkedOption.budget > 100
          ? 100
          : this.stats().budget + checkedOption.budget,
      safety:
        this.stats().safety + checkedOption.safety > 100
          ? 100
          : this.stats().safety + checkedOption.safety,
      infrastructure:
        this.stats().infrastructure + checkedOption.infrastructure > 100
          ? 100
          : this.stats().infrastructure + checkedOption.infrastructure,
      morale:
        this.stats().morale + checkedOption.morale > 100
          ? 100
          : this.stats().morale + checkedOption.morale,
    };

    this.updatePoints(newStats);
  }

  constructor() {}
}
