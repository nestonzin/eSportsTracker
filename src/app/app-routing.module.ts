import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LolComponent } from './lol/lol.component';
import { DotaComponent } from './dota/dota.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'lol',
    component: LolComponent,
  },
  {
    path: 'dota',
    component: DotaComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
