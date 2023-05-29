import { Component } from '@angular/core';
import { LolService } from '../../service/lol.service';

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
