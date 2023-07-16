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
  gameWindow: any;
  gameDetails: any;
  imageUrl: string;

  CHAMPIONS_URL = 'https://ddragon.bangingheads.net/cdn/11.1.1/img/champion/';

  constructor(private route: ActivatedRoute, private lolService: LolService) {
    this.id = '';
    this.imageUrl = '';
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      const startingTime = this.lolService.getISOMultiplyOf10();
      setInterval(() => {
        console.log('test setInterval');
        this.lolService.getGameWindow(this.id, startingTime).subscribe(
          (gameWindow: any) => {
            this.gameWindow = gameWindow;
            console.log('detalhes ?', gameWindow);
          },
          (error: string) => {
            console.log('error', error);
          }
        );

        this.lolService
          .getLiveDetails(this.id, startingTime)
          .subscribe((gameDetails: any) => {
            console.log(gameDetails, 'LiveDetails');
          });
      }, 5000);
    });
  }

  teste(participant: any) {
    console.log('participant', participant);
  }
}
