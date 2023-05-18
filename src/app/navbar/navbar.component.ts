import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  items: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.router.navigate(['/']);
        },
      },
      {
        label: 'eSports',
        icon: 'pi pi-fw pi-android',
        items: [
          {
            label: 'League of Legends',
            icon: 'pi pi-fw pi-android',
            command: () => {
              this.router.navigate(['/lol']);
            },
          },
          // {
          //   separator: true,
          // },
          {
            label: 'Defense of the Ancients 2',
            icon: 'pi pi-fw pi-android',
            command: () => {
              this.router.navigate(['/dota']);
            },
          },
        ],
      },
      {
        label: 'Conta',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Historico',
            icon: 'pi pi-fw pi-history',
            command: () => {
              this.router.navigate(['/historic']);
            },
          },
          {
            label: 'Informações',
            icon: 'pi pi-fw pi-info-circle',
            command: () => {
              this.router.navigate(['/account']);
            },
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
