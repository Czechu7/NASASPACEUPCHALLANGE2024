import { Injectable, signal } from '@angular/core';

interface IStats {
  budget: number;
  safety: number;
  infrastructure: number;
  morale: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  stats = signal<IStats>({ budget: 60, safety: 80, infrastructure: 70, morale: 90 });

  updatePoints(stats: IStats) {
    this.stats.set(stats);
  }

  constructor() { }
}
