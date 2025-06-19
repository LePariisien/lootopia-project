export interface Artefact {
  id: string;
  name: string;
  description: string;
  price: number;
  rarity: string;
  rarityColor: string;
  effect: string;
  image: string;
  isOwned?: boolean;
}
