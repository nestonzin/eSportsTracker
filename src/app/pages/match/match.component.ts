import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LolService } from '../../service/lol.service';
import { GameWindow } from '../../pages/match/gameWindowTypes';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  id: string;
  gameWindow: GameWindow | null = null;
  gameDetails: any;
  imageUrl: string;
  isLoading: boolean = true;

  CHAMPIONS_URL = 'https://ddragon.bangingheads.net/cdn/11.1.1/img/champion/';

  constructor(private route: ActivatedRoute, private lolService: LolService) {
    this.id = '';
    this.imageUrl = '';
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.isLoading = true;
      setInterval(() => {
        const startingTime = this.lolService.getISOMultiplyOf10();
        this.lolService
          .getGameWindow(this.id, startingTime)
          .subscribe((gameWindow: GameWindow) => {
            this.gameWindow = gameWindow;
            console.log('detalhes ?', gameWindow);
          });

        this.lolService
          .getLiveDetails(this.id, startingTime)
          .subscribe((gameDetails: any) => {
            console.log(gameDetails, 'LiveDetails');
          });
      }, 2000);
    });
    this.isLoading = false;
  }
}
