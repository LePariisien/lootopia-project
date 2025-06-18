import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, LocateIcon } from 'lucide-angular';

import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { debounceTime, distinctUntilChanged, lastValueFrom, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../../models/alert.model';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, LeafletModule, AlertComponent],
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent {
  readonly Search = Search;
  readonly LocateIcon = LocateIcon;

  @Input() model: string = '';
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() inputId: string = 'location';

  @Output() modelChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() locate = new EventEmitter<void>();
  @Output() coordinatesChange = new EventEmitter<{ lat: number, lng: number }>();

  alert: Alert = { type: 'success', message: '' };

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      })
    ],
    zoom: 12, // Zoom par défaut
    center: L.latLng(48.8566, 2.3522) // Centre par défaut (Paris)
  };

  marker: L.Marker | null = null; // Variable pour le marqueur
  map: L.Map | null = null; // Référence à l'objet carte Leaflet

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

  private addressInputChanged: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.addressInputChanged.pipe(
          debounceTime(700),
          distinctUntilChanged()
        ).subscribe(address => {
          if (address && address.length > 3) {
            this.geocodeAddress(address);
          } else if (!address) {
            if (this.marker && this.map) {
              this.map.removeLayer(this.marker);
              this.marker = null;
            }
          }
        });
  }

  onModelChange(value: string) {
    this.model = value;
    this.modelChange.emit(value);
  }

  onAddressInputChange(address: string): void {
    this.addressInputChanged.next(address);
  }

  onSearchButtonClick(): void {
    if (this.model && this.model.length > 3) {
      this.geocodeAddress(this.model);
    } else {
      if (this.marker && this.map) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
    }
  }

  openMapLink(): void {
    if (this.model) {
      const coords = this.model.split(',').map(Number);
      let mapUrl: string;

      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        mapUrl = `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
      } else {
        const encodedAddress = encodeURIComponent(this.model);
        mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      }
      window.open(mapUrl, '_blank');
    } else {
      this.setAlert({ type: 'error', message: 'Veuillez entrer un lieu pour afficher sur la carte.' });    }
  }

  onMapReady(map: L.Map): void {
    this.map = map;

    if (this.model) {
      const coords = this.model.split(',').map(Number);
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        const latLng = L.latLng(coords[0], coords[1]);
        this.addOrUpdateMarker(latLng);
        map.setView(latLng, this.options.zoom);
        this.reverseGeocode(latLng.lat, latLng.lng);
      } else {
        this.geocodeAddress(this.model);
      }
    } else {
      this.getUserLocation(true);
    }
  }

  mapClicked(e: L.LeafletMouseEvent): void {
    const latlng = e.latlng;
    this.addOrUpdateMarker(latlng);
    this.reverseGeocode(latlng.lat, latlng.lng);
    this.coordinatesChange.emit({ lat: latlng.lat, lng: latlng.lng });
  }

  addOrUpdateMarker(latlng: L.LatLng): void {
    if (!this.map) return;

    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng, { icon: this.markerIcon }).addTo(this.map!);
    }
    if (this.map) {
      const currentZoom = this.map.getZoom();
      this.map.setView(latlng, Math.max(currentZoom, 15));
    }
  }

  getUserLocation(isInit = false): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const userLatLng = L.latLng(lat, lng);

          console.log(`User location: Latitude: ${lat}, Longitude: ${lng}`);

          if (this.map) {
            this.map.setView(userLatLng, 15);
            this.addOrUpdateMarker(userLatLng);
            this.reverseGeocode(lat, lng);
          } else {
            this.options.center = userLatLng;
            this.options.zoom = 15;
            this.reverseGeocode(lat, lng);
          }
        },
        (error) => {
          let errorMessage = "Impossible de récupérer votre localisation.\n";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Accès à la géolocalisation refusé ou bloqué. Veuillez l'activer dans les paramètres de votre navigateur.\n";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Informations de localisation non disponibles.\n";
              break;
            default:
              errorMessage += "Une erreur inconnue est survenue.\n";
              break;
          }
          isInit
            ? console.warn(errorMessage)
            : this.setAlert({ type: 'error', message: errorMessage + " Veuillez la saisir manuellement ou cliquer sur la carte." });
          console.error('Error getting user location:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      this.setAlert({ type: 'error', message: "Votre navigateur ne supporte pas la géolocalisation." });      this.setAlert({ type: 'error', message: "Votre navigateur ne supporte pas la géolocalisation." });
      console.warn("Geolocation is not supported by this browser.");
    }
  }

  async reverseGeocode(lat: number, lng: number): Promise<void> {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    try {
      const response: any = await lastValueFrom(this.http.get(nominatimUrl));
      if (response && response.display_name) {
        this.model = response.display_name;
        this.modelChange.emit(this.model);
        this.coordinatesChange.emit({ lat, lng });
      } else {
        this.model = `${lat}, ${lng} (Adresse non trouvée)`;
        this.modelChange.emit(this.model);
        console.warn('No address found for these coordinates.');
      }
    } catch (err) {
      console.error('Error during reverse geocoding:', err);
      this.model = `${lat}, ${lng} (Erreur de géocodage)`;
      this.modelChange.emit(this.model);
      this.setAlert({ type: 'error', message: "Erreur lors de la récupération de l'adresse pour les coordonnées. Veuillez réessayer ou saisir manuellement." });
    }
  }

  async geocodeAddress(address: string): Promise<void> {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    try {
      const response: any[] = await lastValueFrom(this.http.get<any[]>(nominatimUrl));
      if (response && response.length > 0) {
        const firstResult = response[0];
        const lat = parseFloat(firstResult.lat);
        const lng = parseFloat(firstResult.lon);
        const newLatLng = L.latLng(lat, lng);

        this.addOrUpdateMarker(newLatLng);
        this.map?.setView(newLatLng, 15);

        this.model = firstResult.display_name;
        this.modelChange.emit(this.model);
        this.coordinatesChange.emit({ lat, lng });
      } else {
        console.warn('No coordinates found for this address:', address);
        if (this.marker && this.map) {
          this.map.removeLayer(this.marker);
          this.marker = null;
        }
        this.setAlert({ type: 'error', message: `Aucune localisation trouvée pour l'adresse: "${address}". Veuillez la saisir avec plus de précision ou utiliser la carte.` });
      }
    } catch (err) {
      console.error('Error during geocoding:', err);
      this.setAlert({ type: 'error', message: "Erreur lors de la recherche de l'adresse. Veuillez vérifier votre saisie et réessayer." });    }
  }

  setAlert(alert: Alert) {
    this.alert = alert;
    setTimeout(() => {
      this.alert = { type: 'success', message: '' };
    }, 4000);
  }
}
