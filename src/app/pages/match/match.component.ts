import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LolService } from '../../service/lol.service';
import { GameDetails } from '../../pages/match/gameWindowTypes';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  id: string;
  gameWindow: GameDetails | null = null;

  constructor(private route: ActivatedRoute, private lolService: LolService) {
    this.id = '';
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.lolService.getGameWindow(this.id).subscribe(
        (gameWindow: any) => {
          this.gameWindow = gameWindow;
          console.log('detalhes ?', gameWindow);
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    });
  }
}
