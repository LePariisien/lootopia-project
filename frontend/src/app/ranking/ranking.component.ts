import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Medal } from 'lucide-angular';
import { PlayerService } from '../services/player.service';
import { TreasureHuntService } from '../services/treasure-hunt.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  readonly Medal = Medal;
  topPlayers: Player[] = [];
  otherPlayers: Player[] = [];
  playerCount!: number;
  totalScore!: number;
  treasureHuntCount!: number;

  constructor(private playerService: PlayerService, private treasureHuntService: TreasureHuntService) {}


  ngOnInit() {
    this.playerService.getAllPlayers().subscribe(players => {
      players.sort((a, b) => b.score - a.score);
      this.topPlayers = players.slice(0, 3).map((p, i) => ({
        ...p,
        rank: i + 1,
        color: i === 0 ? "#FDD47D" : i === 1 ? "#D9D9D9" : "#E5A76E",
        avatar: p.nickname?.substring(0, 2).toUpperCase()
      }));
      this.otherPlayers = players.slice(3, 10).map((p, i) => ({
        ...p,
        rank: i + 4,
        avatar: p.nickname?.substring(0, 2).toUpperCase()
      }));
      this.totalScore = players.reduce((sum, p) => sum + (p.score || 0), 0);
    });
    this.playerService.getPlayerCount().subscribe(count => {
      console.log(`Total players: ${count}`);
      this.playerCount = count;
      });
    this.treasureHuntService.getTreasureHuntCount().subscribe(count => {
      console.log(`Total treasure hunts: ${count}`);
      this.treasureHuntCount = count;
    });
  }

  getRankIcon(rank: number): string {
    switch (rank) {
      case 1: return "assets/images/rank/top1.png";
      case 2: return "assets/images/rank/top2.png";
      case 3: return "assets/images/rank/top3.png";
      default: return "";
    }
  }
}