import { Artefact } from "./artefact.model";

export interface Player {
  id: string;
  nickname: string;
  bio?: string;
  country?: string;
  score: number;
  avatarUrl: string;
  rank?: number;
  color?: string;
  avatar?: string;
  artefacts?: Artefact[];
}
