export interface Clue {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  message: string;
  step: number;
  treasureId: string;
}
