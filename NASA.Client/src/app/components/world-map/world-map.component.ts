import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EonetEvent } from '../../interfaces/eonet.interface';
import { EonetService } from '../../service/eonet-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { RouterEnum } from '../../enums/router.enum';
import * as L from 'leaflet';

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

  constructor(private eonetService: EonetService) {}

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
}
