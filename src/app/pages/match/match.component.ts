import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LolService } from '../../service/lol.service';
import { gameWindow } from '../../pages/match/gameWindowTypes';
import { gameDetails } from './gameDetailsTypes';
import { eventDetails } from './gameEventDetailsTypes';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  id: string;
  imageUrl: string;
  isLoading: boolean = true;
  gameWindow: gameWindow | null = null;
  gameDetails: gameDetails | null = null;
  eventDetails: eventDetails | null = null;
  blueTeamDrakes: string[] = [];
  redTeamDrakes: string[] = [];

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
      this.fetchEventDetails();
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
      this.renderTeamsDrakes();
    }, 5000);
  }

  fetchGameWindow(startingTime: string) {
    this.lolService
      .getGameWindow(this.id, startingTime)
      .subscribe((gameWindow: gameWindow) => {
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

  fetchEventDetails() {
    const matchIdMenosUm = BigInt(this.id) - BigInt(1);
    const matchIdMenosUmString = matchIdMenosUm.toString();
    this.lolService
      .getEventDetails(matchIdMenosUmString)
      .subscribe((eventDetails: eventDetails) => {
        this.eventDetails = eventDetails;
        console.log(eventDetails, 'eventoDetalhes!');
      });
  }

  renderTeamsDrakes() {
    const frames = this.gameWindow?.frames || [];
    const drakeImages: { [key: string]: string } = {
      cloud: 'dragon-cloud.svg',
      elder: 'dragon-elder.svg',
      infernal: 'dragon-infernal.svg',
      mountain: 'dragon-mountain.svg',
      ocean: 'dragon-ocean.svg',
      chemtech: 'dragon-chemtech.svg',
      hextech: 'dragon-hextech.svg',
    };

    frames.map((frame) => {
      this.blueTeamDrakes = this.renderDrakes(
        frame.blueTeam.dragons,
        drakeImages
      );
      this.redTeamDrakes = this.renderDrakes(
        frame.redTeam.dragons,
        drakeImages
      );

      console.log('blueTeam Drakes', this.blueTeamDrakes);
      console.log('redTeam Drakes', this.redTeamDrakes);
    });
  }

  renderDrakes(
    drakes: string[],
    drakeImages: { [key: string]: string }
  ): string[] {
    return drakes.map((drakeType) => drakeImages[drakeType]);
  }
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
