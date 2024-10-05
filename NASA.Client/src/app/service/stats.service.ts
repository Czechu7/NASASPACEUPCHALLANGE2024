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
  points = signal<IStats>({ budget: 60, safety: 80, infrastructure: 70, morale: 90 });

  updatePoints(stats: IStats) {
    this.points.set(stats);
  }

  constructor() { }
}
