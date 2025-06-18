import { Treasure } from "./treasure.model";

export interface TreasureHunt {
  id: string;
  name: string;
  description: string;
  level: number;
  treasure_id: string;
  startDate: string;
  endDate: string;
  organizer_id: string;
  treasure?: Treasure;
  found: boolean;
  address?: string;

  price?: number;
  participantsCount?: number;
  duration?: number;
  tags?: string[];
  events?: string[];
}

export enum HuntLevel {
  Easy = 1,
  Medium = 2,
  Hard = 3
}
