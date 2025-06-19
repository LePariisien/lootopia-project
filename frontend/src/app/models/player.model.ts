import { Artifact } from "./artifact.model";

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
  artefacts?: Artifact[];
}
