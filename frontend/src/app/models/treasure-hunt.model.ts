export interface TreasureHuntRequest {
  id: string;
  name: string;
  description: string;
  level: number;
  treasure_id: string;
  startDate: string;
  endDate: string;
  organizer_id: string;
  found: boolean;
  treasure: Treasure;
  address?: string; 
}

export interface Treasure {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  clueIds: string[];
}

export enum HuntLevel {
  Easy = 1,
  Medium = 2,
  Hard = 3
}
