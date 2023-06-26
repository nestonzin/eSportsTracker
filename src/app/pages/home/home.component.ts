import { Component } from '@angular/core';
import { LolService } from '../../service/lol.service';
import { ISchedule } from './schedulesTypes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  scheduleData = {} as ISchedule;
  scheduleDataDisplayed: any;

  currentPage = 1;
  itemsPerPage = 8;

  isLoading: boolean = true;

  constructor(private LolService: LolService) {}

  ngOnInit() {
    this.getScheduleData();
  }

  getScheduleData() {
    this.isLoading = true;
    this.LolService.getSchedule().subscribe({
      next: (data) => {
        this.scheduleData = data;
        console.log(data);
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

    this.scheduleDataDisplayed = this.scheduleData.data?.schedule?.events.slice(
      startIndex,
      endIndex
    );
  }
}
