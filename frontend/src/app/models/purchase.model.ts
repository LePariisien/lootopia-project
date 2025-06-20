export interface purchase {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface Purchase {
  id: string;
  playerId: string;
  crowns: number;
}