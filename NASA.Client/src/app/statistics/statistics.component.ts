import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GamesService } from '../service/games.service';
import { IUserDecisions } from '../models/question';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public data: IUserDecisions[] = []; // Store the data from the backend

  private width = 300;
  private height = 300;
  private margin = { top: 20, right: 40, bottom: 30, left: 40 };

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    // Fetch data from backend and create graphs for each decision
    this.gamesService.getQuestions().subscribe((response: any) => {
      this.data = response as IUserDecisions[];
      this.createDecisionGraph('decision1', 'chart-decision1');
      this.createDecisionGraph('decision2', 'chart-decision2');
      this.createDecisionGraph('decision3', 'chart-decision3');
      this.createDecisionGraph('decision4', 'chart-decision4');
    });
  }

  private createDecisionGraph(decisionKey: string, chartId: string): void {
    const svg = d3.select(`#${chartId}`)
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .style('max-width', `${this.width}px`)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // X scale (Players) - 1 tick per player, domain from 0 to number of players
    const x = d3.scaleLinear()
      .domain([0, this.data.length - 1]) // Number of players, each player index is represented
      .range([0, this.width - this.margin.left - this.margin.right]);

    // Y scale (Points) - Fixed scale from 0 to 100
    const y = d3.scaleLinear()
      .domain([0, 100]) // Fixed from 0 to 100
      .range([this.height - this.margin.top - this.margin.bottom, 0]);

    // Add X axis (add for each 1 player)
    svg.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
      .call(d3.axisBottom(x).ticks(this.data.length)); // Ticks for each player

    // Add Y axis (max 100)
    svg.append('g')
      .call(d3.axisLeft(y));

    // Line generator for data points
    const line = d3.line<IUserDecisions>()
      .x((d, i) => x(i)) // X - player index
      .y(d => y(+d[decisionKey as keyof IUserDecisions])) // Y - decision value
      .curve(d3.curveMonotoneX);

    // Add line to chart
    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add points for each player
    svg.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => x(i))
      .attr('cy', d => y(+d[decisionKey as keyof IUserDecisions]))
      .attr('r', 3)
      .attr('fill', 'steelblue');
  }
}
