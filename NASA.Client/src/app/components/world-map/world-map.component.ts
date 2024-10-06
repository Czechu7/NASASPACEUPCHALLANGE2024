import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EonetEvent } from '../../interfaces/eonet.interface';
import { EonetService } from '../../service/eonet-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router, RouterModule } from '@angular/router';
import { NarratorModalComponent } from '../../shared/narrator-modal/narrator-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterEnum } from '../../enums/router.enum';
import * as L from 'leaflet';
import { TutorialModalComponent } from '../../shared/tutorial-modal/tutorial-modal.component';
import { MapclickinfoComponent } from '../mapclickinfo/mapclickinfo.component';
import { StatsService } from '../../service/stats.service';

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
  previousSelectedCircle: any = null;
  previousEvent: EonetEvent | null = null;
  RouterEnum = RouterEnum;

  private map!: L.Map; // Use the definite assignment assertion



  constructor(
    private eonetService: EonetService,
    private statsService: StatsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.createMap();
  }

  createMap(): void {
    // Initialize Leaflet map
    this.map = L.map('map').setView([0, 0], 2); // Center the map at coordinates [0, 0]

    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Load events after map creation
    this.loadEvents();

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.handleMapClick(e);
    });
  }

  loadEvents(): void {
    const data = this.eonetService.getEvents();
    this.isLoading = false;
    this.plotEvents(data.events);
  }

  plotEvents(events: EonetEvent[]): void {
    events.forEach((event) => {
      event.geometries.forEach((geometry) => {
        const [long, lat] = geometry.coordinates;

        // Create a marker for each event
        const marker = L.circleMarker([lat, long], {
          radius: geometry.isGame ? 10 : 5,
          color: geometry.isGame ? '#63e667' : 'red',
        }).addTo(this.map);

        // Add click event for the marker
        marker.on('click', () => {
          this.showEventDetails(event, marker, geometry.isGame ?? false); // Use default value
        });
      });
    });
  }
  handleMapClick(e: L.LeafletMouseEvent): void {
    // Check if the click was on a marker by inspecting the event's target
    if ((e.originalEvent.target as HTMLElement).classList.contains('leaflet-interactive')) {
      // If the click was on a marker (which is interactive), do nothing
      return;
    }
  
    const { lat, lng } = e.latlng;
  
    // Create a marker at the clicked location
    const marker = L.circleMarker([lat, lng], {
      radius: 10,
      color: 'yellow',
    }).addTo(this.map);
  
    // Open a dialog
    const dialogRef = this.dialog.open(MapclickinfoComponent, {
      data: ['You clicked on the map!'],
    });
  
    // Remove the marker when the dialog is closed
    dialogRef.afterClosed().subscribe(() => {
      this.map.removeLayer(marker);
    });
  }
  
  showEventDetails(event: EonetEvent, marker: L.CircleMarker, isGame: boolean): void {
    this.selectedEvent = null;

    // Reset color of the previously selected circle based on isGame
    if (this.previousSelectedCircle) {
      const previousIsGame = this.previousEvent?.geometries[0].isGame ?? false; // Default to false
      const previousColor = previousIsGame ? '#63e667' : 'red';
      this.previousSelectedCircle.setStyle({ color: previousColor });
    }

    // Change the color of the clicked circle to purple
    marker.setStyle({ color: 'purple' });

    // Store the selected circle and event
    this.previousSelectedCircle = marker;
    this.previousEvent = event;

    this.selectedEvent = event;
  }

  closeEventDetails(): void {
    this.selectedEvent = null; // Hide the event details when closed
  }

  startGame(): void {
    this.statsService.resetPoints();
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
        const tutorial = this.dialog.open(TutorialModalComponent);
      });

    });


    setTimeout(() => {}, 1000);
  }
}
