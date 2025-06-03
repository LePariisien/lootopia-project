import { Player } from "./player.model";
import { TreasureHunt } from "./treasure-hunt.model";

export interface Participation {
  id: string;
  player_id: string;
  player?: Player;
  treasure_hunt_id: string;
  treasureHunt?: TreasureHunt;
  current_step: number;
  status: string;
  find: boolean;
  startDate: string;
  endDate?: string;
  progress?: number;
}
