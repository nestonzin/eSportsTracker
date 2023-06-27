import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  id: string;
  constructor(private route: ActivatedRoute) {
    this.id = '';
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id); // Exibe o valor do parâmetro id no console
    });
  }
}
