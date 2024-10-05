import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { EonetEvent } from '../../interfaces/eonet.interface';
import { EonetService } from '../../service/eonet-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapComponent implements OnInit {
  constructor(private eonetService: EonetService) {}

  // isLoading = true;
  selectedEvent: EonetEvent | null = null;

  ngOnInit(): void {
    this.createMap();
    this.eonetService.getEvents().subscribe((data) => {
      this.plotEvents(data.events);
      // this.isLoading = false;
    });
  }

  createMap(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select('svg').attr('width', width).attr('height', height);

    const projection = d3
      .geoNaturalEarth1()
      .scale(240)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    ).then((data: any) => {
      svg
        .append('g')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('fill', '#ccc')
        .attr('stroke', '#333')
        .attr('d', (d: any) => path(d));
    });
  }

  plotEvents(events: any[]): void {
    const svg = d3.select('svg');
    const projection = d3
      .geoNaturalEarth1()
      .scale(260)
      .translate([window.innerWidth / 2, window.innerHeight / 2]);

    events.forEach((event) => {
      event.geometries.forEach((geometry: any) => {
        const [long, lat] = geometry.coordinates;
        const projected = projection([long, lat]);

        if (projected) {
          svg
            .append('circle')
            .attr('cx', projected[0])
            .attr('cy', projected[1])
            .attr('r', 5)
            .attr('fill', 'red')
            .attr('stroke', '#000')
            .attr('stroke-width', 1);
        }
      });
    });
  }
}
