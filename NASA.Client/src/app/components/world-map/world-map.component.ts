import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';
import { EonetEvent } from '../../interfaces/eonet.interface';
import { EonetService } from '../../service/eonet-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [SpinnerComponent, MatButtonModule, RouterModule],
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit {
  isLoading = true;
  selectedEvent: EonetEvent | null = null;

  constructor(private eonetService: EonetService) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.createMap();
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
    )
      .then((data: any) => {
        svg
          .append('g')
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('fill', '#ccc')
          .attr('stroke', '#333')
          .attr('d', (d: any) => path(d));
      })
      .finally(() => {
        this.loadEvents();
      });
  }

  loadEvents(): void {
    const data = this.eonetService.getEvents();
    this.isLoading = false;
    this.plotEvents(data.events);
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
            .attr('r', geometry.isGame ? 10 : 5)
            .attr('fill', geometry.isGame ? '#63e667' : 'red')
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
