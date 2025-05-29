import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LocateIcon, Image, Search, Plus } from 'lucide-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HuntStepComponent } from '../hunt-step/hunt-step.component';

import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { LocationSearchComponent } from '../components/location-search/location-search.component';

import { TreasureHuntService } from '../services/treasure-hunt.service';
import { TreasureHuntRequest } from '../models/treasure-hunt.model';
import { ClueService } from '../services/clue.service';
import { Clue } from '../models/clue.model';

interface HuntStep {
  id: number;
  title: string;
  clue: string;
  location: string;
  latitute: number;
  longitude: number;
  type: string;
  solution: string;
}

@Component({
  selector: 'app-create-hunt',
  standalone: true,
  templateUrl: './create-hunt.component.html',
  styleUrls: ['./create-hunt.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HuntStepComponent,
    LucideAngularModule,
    LeafletModule,
    HttpClientModule,
    LocationSearchComponent
  ]
})
export class CreateHuntComponent implements OnInit {
  readonly LocateIcon = LocateIcon;
  readonly Image = Image;
  readonly Search = Search;
  readonly Plus = Plus;


  TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2NyZWF0aW9uX3RpbWVzdGFtcCI6IjIwMjUtMDUtMjZUMjI6NTU6NDIuNzc2NDE3IiwidXNlcl9pZCI6IjFhZDExNmY2LTBiMTUtNDYyYS1iYmMzLTBiZWEzMTdiNGFjOCIsImVtYWlsIjoibWFyY2VsaW5zeWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzMnlfbWNsIiwic3ViIjoiczJ5X21jbCIsImlhdCI6MTc0ODUxNTcxNSwiZXhwIjoxNzQ4NTE5MzE1fQ.7ys63oSfpwCxrCdKHy5U6s2zXNhLHIiUxHn6txDVNeo";
  ID_USER = "0fbb229a-eb38-4a64-8e8d-c73e28487759";

  // General
  huntTitle: string = '';
  huntDescription: string = '';
  huntDifficulty: string = '';
  huntLocation: string = '';
  huntLatitude: number | null = null;
  huntLongitude: number | null = null;
  estimatedDuration: number | null = null;
  approximateDistance: number | null = null;
  coverImage: File | null = null;

  // Tabs
  activeTab: string = 'informations';

  // Leaflet Map properties
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

  marker: L.Marker | null = null; // marqueur
  map: L.Map | null = null; // Référence carte Leaflet

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

  // Hunt Steps
  huntSteps: HuntStep[] = [];
  nextStepId: number = 1;

  // Advanced Options
  visibility: 'public' | 'private' | 'friends' = 'public';
  rewardDescription: string = '';
  rewardBadge: boolean = false;
  maxParticipants: number | null = null;
  endDate: string = '';

  constructor(private http: HttpClient,
    private treasureHuntService: TreasureHuntService,
    private clueService: ClueService) { }

  ngOnInit(): void {
    this.addStep();
    this.addStep();

    this.addressInputChanged.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(address => {
      if (!address) {
        if (this.marker && this.map) {
          this.map.removeLayer(this.marker);
          this.marker = null;
        }
      }
    });
  }

  onAddressInputChange(address: string): void {
    this.addressInputChanged.next(address);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  addStep(): void {
    this.huntSteps.push({
      id: this.nextStepId++,
      title: '',
      clue: '',
      location: '',
      latitute: 0,
      longitude: 0,
      type: '',
      solution: ''
    });
  }

  removeStep(id: number): void {
    this.huntSteps = this.huntSteps.filter(step => step.id !== id);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.coverImage = input.files[0];
      console.log('Cover image selected:', this.coverImage.name);
    }
  }

  onHuntCoordinatesChange(coords: { lat: number, lng: number }) {
    this.huntLatitude = coords.lat;
    this.huntLongitude = coords.lng;
  }

  saveDraft(): void {
    console.log('Hunt Data:', {
      huntTitle: this.huntTitle,
      huntDescription: this.huntDescription,
      huntLocation: this.huntLocation,
      huntLatitude: this.huntLatitude,
      huntLongitude: this.huntLongitude,
      huntDifficulty: this.huntDifficulty,
      estimatedDuration: this.estimatedDuration,
      approximateDistance: this.approximateDistance,
      coverImage: this.coverImage ? this.coverImage.name : 'No image',
      huntSteps: this.huntSteps,
      visibility: this.visibility,
      rewardDescription: this.rewardDescription,
      rewardBadge: this.rewardBadge,
      maxParticipants: this.maxParticipants,
      endDate: this.endDate
    });

  }

  publishClues(token: string, treasureId: string): void {
    const clues: Clue[] = this.huntSteps.map((step, index) => ({
      id: "",
      latitude: step.latitute,
      longitude: step.longitude,
      address: step.location,
      message: step.clue,
      step: index + 1,
      treasureId: treasureId
    }));

    this.clueService.createClues(token, clues).subscribe({
      next: (response) => {
        console.log('Clues published!', response);
      },
      error: (err) => {
        console.error('Erreur lors de la publication des clues', err);
      }
    });
  }

  publishHunt(): void {
    if (!this.areRequiredFieldsFilled()) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }

    const body: TreasureHuntRequest = {
      id: "",
      name: this.huntTitle,
      description: this.huntDescription,
      level: this.huntDifficulty === 'easy' ? 1 :
        this.huntDifficulty === 'medium' ? 2 : 3,
      treasure_id: "",
      startDate: new Date().toISOString(),
      endDate: this.endDate ? new Date(this.endDate).toISOString() : new Date().toISOString(),
      organizer_id: this.ID_USER,
      treasure: {
        id: "",
        latitude: this.huntLatitude ?? 0,
        longitude: this.huntLongitude ?? 0,
        address: this.huntLocation,
        clueIds: []
      },
      found: false
    };

    this.treasureHuntService.createTreasureHunt(this.TOKEN, body).subscribe({
      next: (response) => {
        console.log('Hunt published!');

        const treasure_id = response.treasure_id;
        body.treasure_id = treasure_id;
        this.publishClues(this.TOKEN, treasure_id);

        this.resetForm();
        this.activeTab = 'informations';
        alert('Chasse au trésor et étapes publiées avec succès !');
      },
      error: (err) => {
        alert('Erreur lors de la publication de la chasse au trésor. Veuillez réessayer.');
        console.error('Erreur lors de la publication', err);
      }
    });
  }

  resetForm(): void {
    this.huntTitle = '';
    this.huntDescription = '';
    this.huntDifficulty = '';
    this.huntLocation = '';
    this.huntLatitude = null;
    this.huntLongitude = null;
    this.estimatedDuration = null;
    this.approximateDistance = null;
    this.coverImage = null;
    this.huntSteps = [];
    this.visibility = 'public';
    this.rewardDescription = '';
    this.rewardBadge = false;
    this.maxParticipants = null;
    this.endDate = '';
  }

  private areRequiredFieldsFilled(): boolean {
    return !!(
      this.huntTitle &&
      this.huntDescription &&
      this.huntDifficulty &&
      this.huntLocation &&
      this.huntLatitude !== null &&
      this.huntLongitude !== null &&
      this.huntSteps.length > 1 &&
      this.huntSteps.every(step => step.title && step.clue && step.location && step.latitute && step.longitude) &&
      this.maxParticipants !== null &&
      this.endDate
    );
  }

}
