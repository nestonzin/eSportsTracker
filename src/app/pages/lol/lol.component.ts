import { Component } from '@angular/core';
import { LolService } from '../../service/lol.service';
import { Schedule } from '../home/schedulesTypes';
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
