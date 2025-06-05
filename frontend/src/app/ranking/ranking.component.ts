import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../components/header/header.component";

interface PlayerRanking {
  rank: number;
  username: string;
  score: number;
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  players: PlayerRanking[] = [];

  ngOnInit() {
    // Exemple statique, à remplacer par un appel API
    this.players = [
      { rank: 1, username: 'Alice', score: 1200 },
      { rank: 2, username: 'Bob', score: 1100 },
      { rank: 3, username: 'Charlie', score: 950 },
      { rank: 4, username: 'David', score: 900 },
      { rank: 5, username: 'Eve', score: 850 },
      { rank: 6, username: 'Frank', score: 800 },
      { rank: 7, username: 'Grace', score: 750 },
      { rank: 8, username: 'Heidi', score: 700 },
      { rank: 9, username: 'Ivan', score: 650 },
      { rank: 10, username: 'Judy', score: 600 }
    ];
  }
}
