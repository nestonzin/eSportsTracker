import { Component } from '@angular/core';
import { LolService } from '../../service/lol.service';
import { ISchedule } from '../home/schedulesTypes';
import { Router } from '@angular/router';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-lol',
  templateUrl: './lol.component.html',
  styleUrls: ['./lol.component.scss'],
})
export class LolComponent {
  scheduleData: any = [];
  scheduleDataDisplayed: any;

  // gameInProgress: ISchedule | null = null;
  gameInProgress: any = [];
  unstartedGames: any = [];

  currentPage = 1;
  itemsPerPage = 8;
  isLoading: boolean = true;
  filterTeams: string = '';

  constructor(
    private LolService: LolService,
    private Router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.getScheduleData();
    this.fetchSchedueleGamesInProgress();
    this.fetchUnstartedScheduleGames();
  }

  getScheduleData() {
    this.isLoading = true;
    this.LolService.getSchedule().subscribe({
      next: (data) => {
        this.scheduleData = data.data.schedule.events.filter(
          (data) => data.state != 'completed'
        );
        console.log(this.scheduleData, 'jogos');
        this.onPageChange({ first: 0, rows: this.itemsPerPage });
        this.isLoading = false;
      },
      error: (error) => {
        console.log('erro', error);
      },
    });
  }

  fetchSchedueleGamesInProgress() {
    this.isLoading = true;

    this.LolService.getSchedule().subscribe({
      next: (match) => {
        this.gameInProgress = match.data.schedule.events.filter(
          (match) => match.state === 'inProgress'
        );

        console.log(this.gameInProgress, 'filtro de jogos inProgress');
      },

      error: (error) => {
        console.log('erro', error);
      },
    });
  }

  fetchUnstartedScheduleGames() {
    this.isLoading = true;

    this.LolService.getSchedule().subscribe({
      next: (match) => {
        this.unstartedGames = match.data.schedule.events.filter(
          (match) => match.state === 'unstarted'
        );
        console.log(this.unstartedGames, 'filtro de jogos unStarted');
      },
      error: (error) => {
        console.log(error, 'erro');
      },
    });
  }

  onPageChange(event: any) {
    const startIndex = event.first;
    const endIndex = event.first + event.rows;

    this.scheduleDataDisplayed = this.scheduleData.slice(startIndex, endIndex);
  }

  navigateToMatch(matchId: string) {
    const currentMatchId = BigInt(matchId);
    const urlMatchId = (currentMatchId + BigInt(1)).toString();
    const route = `/match/${urlMatchId}`;
    this.Router.navigate([route]);
  }
}
