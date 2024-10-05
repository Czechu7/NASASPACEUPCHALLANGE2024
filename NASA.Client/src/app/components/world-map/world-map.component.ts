import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { customZagrebEvent } from '../../data/data';
import { EonetApiResponse, EonetEvent } from '../../interfaces/eonet.interface';
import { EonetService } from '../../service/eonet-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [SpinnerComponent, MatButtonModule],
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit {
  isLoading = false;
  selectedEvent: EonetEvent | null = null;

  constructor(private eonetService: EonetService) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.createMap();
    this.loadEvents();
  }

  createMap(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select('svg').attr('width', width).attr('height', height);

    const projection = d3
      .geoNaturalEarth1()
      .scale(300)
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

  loadEvents(): void {
    this.eonetService.getEvents().subscribe((data: EonetApiResponse) => {
      this.isLoading = false;
      data.events.push(customZagrebEvent);
      this.plotEvents(data.events);
    });
  }

  plotEvents(events: EonetEvent[]): void {
    const svg = d3.select('svg');
    const projection = d3
      .geoNaturalEarth1()
      .scale(300)
      .translate([window.innerWidth / 2, window.innerHeight / 2]);

    events.forEach((event) => {
      event.geometries.forEach((geometry) => {
        const [long, lat] = geometry.coordinates;
        const projected = projection([long, lat]);

        if (projected) {
          svg
            .append('circle')
            .attr('cx', projected[0])
            .attr('cy', projected[1])
            .attr('r', 5)
            .attr('fill', geometry.isGame ? 'green' : 'red')
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .on('click', () => this.showEventDetails(event));
        }
      });
    });
  }

  showEventDetails(event: EonetEvent): void {
    this.selectedEvent = null;
    this.selectedEvent = event;
  }
}
