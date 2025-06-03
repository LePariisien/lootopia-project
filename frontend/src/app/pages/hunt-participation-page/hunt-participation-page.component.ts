import { Component } from '@angular/core';
import { HuntHeaderComponent } from "../../components/hunt-header/hunt-header.component";
import { HuntStepCardComponent } from "../../components/hunt-step-card/hunt-step-card.component";
import { HuntCompletedStepsComponent } from "../../components/hunt-completed-steps/hunt-completed-steps.component";
import { HuntSidebarComponent } from "../../components/hunt-sidebar/hunt-sidebar.component";
import { TreasureHunt } from '../../models/treasure-hunt.model';
import { Clue } from '../../models/clue.model';
import { Treasure } from '../../models/treasure.model';
import { Participation } from '../../models/participation.model';

@Component({
  selector: 'app-hunt-participation-page',
  imports: [HuntHeaderComponent, HuntStepCardComponent, HuntCompletedStepsComponent, HuntSidebarComponent],
  templateUrl: './hunt-participation-page.component.html',
  styleUrl: './hunt-participation-page.component.css'
})
export class HuntParticipationPageComponent {

  TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2NyZWF0aW9uX3RpbWVzdGFtcCI6IjIwMjUtMDUtMjZUMjI6NTU6NDIuNzc2NDE3IiwidXNlcl9pZCI6IjFhZDExNmY2LTBiMTUtNDYyYS1iYmMzLTBiZWEzMTdiNGFjOCIsImVtYWlsIjoibWFyY2VsaW5zeWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzMnlfbWNsIiwic3ViIjoiczJ5X21jbCIsImlhdCI6MTc0ODUxNTcxNSwiZXhwIjoxNzQ4NTE5MzE1fQ.7ys63oSfpwCxrCdKHy5U6s2zXNhLHIiUxHn6txDVNeo";
  ID_USER = "0fbb229a-eb38-4a64-8e8d-c73e28487759";

  longitude: number = 0;
  latitude: number = 0;

  treasureHunt: TreasureHunt = {
    id: '1',
    name: 'Le Trésor des Templiers',
    description: 'Une chasse au trésor palpitante à travers les mystères des Templiers.',
    level: 2,
    treasure_id: 'treasure-123',
    startDate: '2023-10-01T10:00:00Z',
    endDate: '2023-10-31T22:00:00Z',
    organizer_id: this.ID_USER,
    found: false
  };

  treasure: Treasure = {
    id: 'treasure-123',
    latitude: 48.8566,
    longitude: 2.3522,
    address: 'Place de la République, Paris',
    clueIds: ['clue-1', 'clue-2']
  };

  clues: Clue[] = [
    {
      id: 'clue-1',
      title: 'Étape 1 : Le Début de l’Aventure',
      latitude: 48.8566,
      longitude: 2.3522,
      address: 'Vieille Église, Paris',
      message: 'Cherchez le premier indice près de la vieille église.',
      step: 1,
      treasureId: 'treasure-123'
    },
    {
      id: 'clue-2',
      title: 'Étape 2 : La Piste du Chevalier',
      latitude: 48.8584,
      longitude: 2.2945,
      address: 'Château Fort, Paris',
      message: 'Suivez les traces du chevalier jusqu’au château.',
      step: 2,
      treasureId: 'treasure-123'
    },
    {
      id: 'clue-3',
      title: 'Étape 3 : La Piste du Poisson d’Or',
      latitude: 48.8574,
      longitude: 2.2950,
      address: 'Mairie, Paris',
      message: 'Cherchez le trésor caché près de la mairie.',
      step: 3,
      treasureId: 'treasure-123'
    }
  ]

  participation: Participation = {
    id: 'participation-123',
    player_id: this.ID_USER,
    treasure_hunt_id: '1',
    current_step: 2,
    status: 'En cours',
    find: false,
    startDate: '2025-06-01T10:00:00Z',
  };

  step: number = (this.participation.current_step ?? 1) - 1;

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Latitude:', this.latitude, 'Longitude:', this.longitude);
        },
        (error) => {
          console.error('Erreur de géolocalisation :', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }


}
