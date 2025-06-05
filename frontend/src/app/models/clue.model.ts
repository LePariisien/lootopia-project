export interface Clue {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  address: string;
  message: string;
  step: number;
  treasureId: string;
  solved?: boolean;
}
