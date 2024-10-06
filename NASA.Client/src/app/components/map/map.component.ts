import { Component, OnInit, SimpleChanges } from '@angular/core';
import { imageOverlay, layerGroup, map, polygon, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  coordinates: [number, number] = [45.815, 15.9819];
  zoom: number = 13;

  floodArea: [number, number][][] = [
    [
      [45.81, 15.97],
      [45.82, 15.98],
      [45.81, 16.0],
      [45.8, 15.99],
      [45.81, 15.97],
    ],
  ];

  map: L.Map | undefined;
  floodLayer: L.LayerGroup | undefined;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['floodArea'] && this.map) {
      this.addFloodLayer();
    }
  }

  private initializeMap(): void {
    this.map = map('map').setView(this.coordinates, this.zoom);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.addFloodLayer();

    const imageUrl = '/assets/image.png';
    const imageBounds: [[number, number], [number, number]] = [
      [45.805, 15.965],
      [45.825, 16.01],
    ];

    imageOverlay(imageUrl, imageBounds).addTo(this.map);
  }

  private addFloodLayer(): void {
    if (this.floodLayer) {
      this.map?.removeLayer(this.floodLayer);
    }

    this.floodLayer = layerGroup();

    this.floodArea.forEach((area) => {
      const poly = polygon(area, {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
      });
      poly.addTo(this.floodLayer!);
    });

    this.floodLayer.addTo(this.map!);
  }
}
