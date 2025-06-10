import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CheckCircle, Leaf, LucideAngularModule, MapPin, Users } from 'lucide-angular';
import * as L from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { HuntTeamInfoComponent } from "../hunt-team-info/hunt-team-info.component";
import { Player } from '../../../models/player.model';
import { Participation } from '../../../models/participation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hunt-sidebar',
  templateUrl: './hunt-sidebar.component.html',
  styleUrl: './hunt-sidebar.component.css',
  standalone: true,
  imports: [
    LucideAngularModule,
    CommonModule,
    LeafletModule,
    HuntTeamInfoComponent,
    FormsModule
  ]
})
export class HuntSidebarComponent {
  readonly MapPin = MapPin;
  readonly CheckCircle = CheckCircle;
  readonly Users = Users;

  @Input() player!: Player;
  @Input() participation!: Participation;
  @Input() latitude!: number;
  @Input() longitude!: number;

  @Output() notesSaved = new EventEmitter<string>();

  tab: 'carte' | 'notes' = 'carte';

  activeTab: string = 'carte';

  markerIcon = L.icon({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  sidebarMapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: L.latLng(48.8566, 2.3522) // Paris par défaut
  };

  private sidebarMap: L.Map | null = null;
  private sidebarMarker: L.Marker | null = null;
  private watchId: number | null = null;

  notesDraft: string = '';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onSidebarMapReady(map: L.Map) {
    this.sidebarMap = map;
    this.locateAndFollowUser();
  }

  onSidebarMapClick(e: L.LeafletMouseEvent) {
    const latlng = e.latlng;
    if (this.sidebarMarker) {
      this.sidebarMarker.setLatLng(latlng);
    } else if (this.sidebarMap) {
      this.sidebarMarker = L.marker(latlng, { icon: this.markerIcon }).addTo(this.sidebarMap);
    }
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  locateAndFollowUser() {
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const latlng = L.latLng(lat, lng);

          if (this.sidebarMarker) {
            this.sidebarMarker.setLatLng(latlng);
          } else if (this.sidebarMap) {
            this.sidebarMarker = L.marker(latlng, { icon: this.markerIcon }).addTo(this.sidebarMap);
          }
          if (this.sidebarMap) {
            this.sidebarMap.setView(latlng, 15);
          }
        },
        (error) => {
          console.warn('Géolocalisation non disponible ou refusée.', error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 30000 }
      );
    } else {
      console.warn('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }

  fitSidebarMapToPosition() {
    if (this.sidebarMap && this.sidebarMarker) {
      this.sidebarMap.setView(this.sidebarMarker.getLatLng(), 15);
    } else {
      console.warn('La carte ou le marqueur n\'est pas initialisé.');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.notesDraft = this.participation?.notes || '';

    if (changes['latitude'] || changes['longitude']) {
      if (this.sidebarMap && this.latitude && this.longitude) {
        const latlng = L.latLng(this.latitude, this.longitude);
        if (this.sidebarMarker) {
          this.sidebarMarker.setLatLng(latlng);
        } else {
          this.sidebarMarker = L.marker(latlng, { icon: this.markerIcon }).addTo(this.sidebarMap);
        }
        this.sidebarMap.setView(latlng, 15);
      }
    }
  }

  onNotesChange(value: string) {
    this.notesDraft = value;
  }

  saveNotes() {
    if (this.participation) {
      this.notesSaved.emit(this.notesDraft);
    } else {
      console.warn('Aucune participation disponible pour sauvegarder les notes.');
    }
  }

}
