import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  private data = [
    { month: 'January', year: 2020, level: 5 },
    { month: 'February', year: 2020, level: 10 },
    { month: 'March', year: 2020, level: 8 },
    { month: 'April', year: 2020, level: 15 },
    { month: 'May', year: 2020, level: 12 },
    { month: 'June', year: 2020, level: 20 },
    { month: 'July', year: 2020, level: 25 },
    { month: 'August', year: 2020, level: 18 },
    { month: 'September', year: 2020, level: 22 },
    { month: 'October', year: 2020, level: 30 },
    { month: 'November', year: 2020, level: 28 },
    { month: 'December', year: 2020, level: 35 }
  ];

  private svg: any;
  private margin = { top: 20, right: 30, bottom: 40, left: 40 };
  private width = 1000 - this.margin.left - this.margin.right;
  private height = 600 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select("div#chart")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
      .domain(data.map(d => `${d.month} ${d.year}`))
      .range([0, this.width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.level) as number])
      .nice()
      .range([this.height, 0]);

    this.svg.append("g")
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    this.svg.append("g")
      .call(d3.axisLeft(y));

    this.svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: { month: string; year: number; level: number }) => x(`${d.month} ${d.year}`))
      .attr("y", (d: { month: string; year: number; level: number }) => y(d.level))
      .attr("width", x.bandwidth())
      .attr("height", (d: { mounth:string;year: number; level: number }) => this.height - y(d.level))
      .attr("fill", "steelblue");
  }



}
