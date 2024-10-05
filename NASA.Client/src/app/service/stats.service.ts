import { Injectable, signal } from '@angular/core';

interface IStats {
  budget: number;
  safety: number;
  infrastructure: number;
  morale: number;
}

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

  nextRounde() {
    this.round.update((r) => r + 1);

    if (this.day() % 4 === 0) {
      this.day.update((d) => d + 1);
    }
  }

  constructor() {}
}
