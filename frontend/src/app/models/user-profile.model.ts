export interface UserProfile {
  username: string;
  avatarUrl: string;
  crownBalance: number;
  huntsCompleted: number;
  treasuresFound: number;
  riddlesSolved: number;
  badgesWon: number;
}

export interface Player {
  nickname: string;
  bio: string;
  country: string;
  avatarUrl: string;
  level: number;
}
