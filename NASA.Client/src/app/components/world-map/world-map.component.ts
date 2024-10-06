import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';
import { EonetEvent } from '../../interfaces/eonet.interface';
import { EonetService } from '../../service/eonet-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router, RouterModule } from '@angular/router';
import { NarratorModalComponent } from '../../shared/narrator-modal/narrator-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterEnum } from '../../enums/router.enum';

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
  previousSelectedCircle: any = null; // To track the previous circle
  previousEvent: EonetEvent | null = null; // Track the previous event to reset its color
  RouterEnum = RouterEnum;

  constructor(
    private eonetService: EonetService,
    private router: Router,
    private dialog: MatDialog
  ) {}

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
          const isGame = geometry.isGame ?? false; // Handle undefined with default value false
          const circle = svg
            .append('circle')
            .attr('cx', projected[0])
            .attr('cy', projected[1])
            .attr('r', isGame ? 10 : 5)
            .attr('fill', isGame ? '#63e667' : 'red')
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .on('click', () => {
              this.showEventDetails(event, circle, isGame); // Pass the isGame boolean
            });
        }
      });
    });
  }

  showEventDetails(event: EonetEvent, circle: any, isGame: boolean): void {
    this.selectedEvent = null;

    // Reset color of the previously selected circle based on isGame
    if (this.previousSelectedCircle) {
      const previousIsGame = this.previousEvent?.geometries[0].isGame ?? false; // Handle undefined
      const previousColor = previousIsGame ? '#63e667' : 'red'; // Use isGame for color reset
      this.previousSelectedCircle.attr('fill', previousColor);
    }

    // Change the color of the clicked circle to purple
    circle.attr('fill', 'purple');

    // Store the selected circle and event
    this.previousSelectedCircle = circle;
    this.previousEvent = event;

    this.selectedEvent = event;
  }

  closeEventDetails(): void {
    this.selectedEvent = null; // Hide the event details when closed
  }

  startGame(): void {
    console.log('Starting game...');
    const narrator = this.dialog.open(NarratorModalComponent, {
      data: [
        'You are now at the head of a crisis staff. The sky is darkening on the horizon, the clouds are gathering inexorably. The flood is coming - that much is certain. Your team must make the right decisions to prepare for the inevitable.',
        'What do you need to know to take the right action? ',
        "Start with weather forecasts. Precipitation will be key. Are the forecasts calling for heavy rains? For how long will they last? These are not mere questions - the answers will determine how quickly river levels will rise. Storms? That's an additional problem, because they can bring local but violent hits of water.",
        'Now look at the rivers. What are the water levels? If the river is already filling its bed after the recent rainfall, each additional drop brings disaster closer. Think about reservoirs - can they take in more water, or can they not withstand the onslaught? Overflowing dams can burst, and then the scenario gets much worse.',
      ],
    });
    narrator.afterClosed().subscribe(() => {
      const narrator2 = this.dialog.open(NarratorModalComponent, {data: ["Don't forget the terrain. Is it valleys, where water easily accumulates, or a hilly area from which water flows rapidly? Pay attention to urban areas - concrete does not absorb water. Any drop that falls on the city will quickly find its way to low areas, creating dangerous spills.", "Sewerage and infrastructure - the key to avoiding chaos. Is the rainwater drainage system efficient? If not, even moderate rainfall can cause flooding. Check bridges, roads, tunnels - any obstacle in the way can make the situation worse.", "History always tells more than it seems. Flooding is not always a surprise - it can recur in cycles. If it happened here a few years ago, consider what went wrong then. Maybe the same areas are equally at risk today?", "People and resources. You need to know how many people will need help. How many residents need to be evacuated? Do you have enough boats, equipment, firefighters to act quickly? Preparing an evacuation plan is the first step, but you also need to have something to act with."]});
      narrator2.afterClosed().subscribe(() => {

        this.router.navigate([RouterEnum.Game]);
      });

    });


    setTimeout(() => {}, 1000);
  }
}
