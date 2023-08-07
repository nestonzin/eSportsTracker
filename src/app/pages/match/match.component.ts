import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LolService } from '../../service/lol.service';
import { gameWindow } from '../../pages/match/gameWindowTypes';
import { gameDetails } from './gameDetailsTypes';
import { eventDetails } from './gameEventDetailsTypes';
import { Observable } from 'rxjs';

import { MessageService } from 'primeng/api';

interface TeamParticipant {
  championId: string;
  summonerName: string;
  currentHealth: number;
  level: number;
  totalGold: number;
  creepScore: number;
  kills: number;
  deaths: number;
  assists: number;
}
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [MessageService],
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

  constructor(
    private route: ActivatedRoute,
    private lolService: LolService,
    private Router: Router,
    private messageService: MessageService
  ) {
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
      // this.renderTeamsDrakes();
    }, 1000);
  }

  fetchGameWindow(startingTime: string) {
    this.lolService
      .getGameWindow(this.id, startingTime)
      .subscribe((gameWindow: gameWindow) => {
        this.gameWindow = gameWindow;
        // console.log(gameWindow, 'gameWindow');
      });
  }

  fetchGameDetails(startingTime: string) {
    this.lolService
      .getLiveDetails(this.id, startingTime)
      .subscribe((gameDetails: any) => {
        this.gameDetails = gameDetails;
        // console.log(gameDetails, 'gameDetails');
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

  navigateToBestOfMatch() {
    const games = this.eventDetails?.data.event.match.games;
    if (!games || games.length === 0) {
      console.log('Não há jogos disponíveis');
      return;
    }

    const inProgressIndex = games.findIndex(
      (game) => game.state === 'inProgress'
    );
    const gameId =
      inProgressIndex !== -1
        ? games[inProgressIndex].id
        : games.filter((game) => game.state !== 'uneeded').pop()?.id;
    const route = `/match/${gameId}`;
    // this.Router.navigate([route]);

    console.log(route, 'route');
  }

  renderTeamsDrakes() {
    const frames = this.gameWindow?.frames || [];
    const drakeImages: { [key: string]: string } = {
      cloud: '../../../assets/dragon-cloud.svg',
      elder: '../../../assets/dragon-elder.svg',
      infernal: '../../../assets/dragon-infernal.svg',
      mountain: '../../../assets/dragon-mountain.svg',
      ocean: '../../../assets/dragon-ocean.svg',
      chemtech: '../../../assets/dragon-chemtech.svg',
      hextech: '../../../assets/dragon-hextech.svg',
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
    });
  }

  renderDrakes(
    drakes: string[],
    drakeImages: { [key: string]: string }
  ): string[] {
    const defeatedDrakes: string[] = []; // Array para armazenar os dragões já derrotados
    return drakes.map((drakeType) => {
      const drakeImage = drakeImages[drakeType];
      if (defeatedDrakes.includes(drakeType)) {
        return drakeImage; // Se o dragão já foi derrotado, apenas retorna a imagem
      }
      defeatedDrakes.push(drakeType); // Adiciona o dragão ao array de dragões derrotados
      this.messageService.add({
        severity: 'info',
        summary: 'Dragão eliminado',
        detail: `O Dragão ${drakeType} foi eliminado`,
      });
      return drakeImage;
    });
  }

  getBlueTeamParticipants(): TeamParticipant[] {
    const latestFrame =
      this.gameWindow?.frames[this.gameWindow.frames.length - 1];
    return (
      this.gameWindow?.gameMetadata.blueTeamMetadata.participantMetadata.map(
        (participant, index) => ({
          championId: participant.championId,
          summonerName: participant.summonerName,
          currentHealth:
            latestFrame?.blueTeam.participants[index]?.currentHealth ?? 0,
          level: latestFrame?.blueTeam.participants[index]?.level ?? 0,
          totalGold: latestFrame?.blueTeam.participants[index]?.totalGold ?? 0,
          creepScore:
            latestFrame?.blueTeam.participants[index]?.creepScore ?? 0,
          kills: latestFrame?.blueTeam.participants[index]?.kills ?? 0,
          deaths: latestFrame?.blueTeam.participants[index]?.deaths ?? 0,
          assists: latestFrame?.blueTeam.participants[index]?.assists ?? 0,
        })
      ) ?? []
    );
  }

  getRedTeamParticipants(): TeamParticipant[] {
    const latestFrame =
      this.gameWindow?.frames[this.gameWindow.frames.length - 1];
    return (
      this.gameWindow?.gameMetadata.redTeamMetadata.participantMetadata.map(
        (participant, index) => ({
          championId: participant.championId,
          summonerName: participant.summonerName,
          currentHealth:
            latestFrame?.redTeam.participants[index]?.currentHealth ?? 0,
          level: latestFrame?.redTeam.participants[index]?.level ?? 0,
          totalGold: latestFrame?.redTeam.participants[index]?.totalGold ?? 0,
          creepScore: latestFrame?.redTeam.participants[index]?.creepScore ?? 0,
          kills: latestFrame?.redTeam.participants[index]?.kills ?? 0,
          deaths: latestFrame?.redTeam.participants[index]?.deaths ?? 0,
          assists: latestFrame?.redTeam.participants[index]?.assists ?? 0,
        })
      ) ?? []
    );
  }
}
