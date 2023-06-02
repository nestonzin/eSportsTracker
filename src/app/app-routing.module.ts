import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LolComponent } from './pages/lol/lol.component';
import { DotaComponent } from './pages/dota/dota.component';
import { AccountComponent } from './pages/account/account.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
    pathMatch: 'full',
  },
  {
    path: 'account/historic',
    component: HistoricComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
