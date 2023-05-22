import { Component } from '@angular/core';
import { LolService } from '../../service/lol.service';
import { ISchedule } from './schedulesTypes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  scheduleData: any = [];
  scheduleDataDisplayed: any;

  currentPage = 1;
  itemsPerPage = 8;

  constructor(private LolService: LolService) {}

  ngOnInit() {
    this.getScheduleData();
  }

  getScheduleData() {
    this.LolService.getSchedule().subscribe({
      next: (data) => {
        this.scheduleData = data;
        console.log(data);
        this.onPageChange({ first: 0, rows: this.itemsPerPage });
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
