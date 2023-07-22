import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LolService } from '../../service/lol.service';
import { GameWindow } from '../../pages/match/gameWindowTypes';
import { GameDetails } from './gameDetailsTypes';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  id: string;
  imageUrl: string;
  isLoading: boolean = true;
  gameWindow: GameWindow | null = null;
  gameDetails: any;

  currentHP: number = 0;
  CHAMPIONS_URL = 'https://ddragon.bangingheads.net/cdn/11.1.1/img/champion/';

  constructor(private route: ActivatedRoute, private lolService: LolService) {
    this.id = '';
    this.imageUrl = '';
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.startPolling();
    });
    this.isLoading = true;
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  startPolling() {
    setInterval(() => {
      const startingTime = this.lolService.getISOMultiplyOf10();
      this.fetchGameWindow(startingTime);
      this.fetchGameDetails(startingTime);
    }, 5000);
  }

  fetchGameWindow(startingTime: string) {
    this.lolService
      .getGameWindow(this.id, startingTime)
      .subscribe((gameWindow: GameWindow) => {
        this.gameWindow = gameWindow;
        console.log(gameWindow, 'gameWindow');
      });
  }

  fetchGameDetails(startingTime: string) {
    this.lolService
      .getLiveDetails(this.id, startingTime)
      .subscribe((gameDetails: any) => {
        this.gameDetails = gameDetails;
        console.log(gameDetails, 'gameDetails');
      });
  }

 

  // getCombinedGameData() {
  //   if (!this.gameWindow || !this.gameDetails) {
  //     return null;
  //   }

  //   const combinedGameData = {
  //     gameWindow: this.gameWindow,
  //     gameDetails: this.gameDetails,
  //   };
  //   console.log(combinedGameData, 'objeto combinando os dados');
  //   return combinedGameData;
  // }
}
