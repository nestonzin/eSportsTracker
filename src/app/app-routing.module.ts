import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LolComponent } from './pages/lol/lol.component';
import { DotaComponent } from './pages/dota/dota.component';
import { AccountComponent } from './pages/account/account.component';
import { HistoricComponent } from './pages/historic/historic.component';

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
  {
    path:'account/historic',
    component: HistoricComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
