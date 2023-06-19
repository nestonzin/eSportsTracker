import { Component, OnInit } from '@angular/core';
import { DotaService } from 'src/app/service/dota.service';

@Component({
  selector: 'app-dota',
  templateUrl: './dota.component.html',
  styleUrls: ['./dota.component.scss'],
})
export class DotaComponent implements OnInit {
  proMatches: any[] = [];
  proMatchesDisplayed: any[] = [];
  totalProMatches: number = 0;
  currentPage = 1;
  itemsPerPage = 8;

  constructor(private dotaService: DotaService) {}

  ngOnInit(): void {
    this.getDotaProMatches();
  }

  getDotaProMatches(): void {
    this.dotaService.getDotaProMatches().subscribe(
      (proMatches) => {
        console.log(proMatches, 'proMatches');
        this.proMatches = proMatches;
        this.totalProMatches = proMatches.length;
        this.updateProMatchesDisplayed();
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  updateProMatchesDisplayed(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.proMatchesDisplayed = this.proMatches.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.updateProMatchesDisplayed();
  }
}
