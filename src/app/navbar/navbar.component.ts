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
              this.router.navigate(['lol']);
            },
          },
          {
            label: 'Defense of the Ancients 2',
            icon: 'pi pi-fw pi-android',
            command: () => {
              this.router.navigate(['dota']);
            },
          },
        ],
      },
      {
        label: 'Sign-up/Login',
        icon: 'pi pi-fw pi-user',
        command: () => {
          this.router.navigate(['/login']);
        },
      },
    ];
  }
}
