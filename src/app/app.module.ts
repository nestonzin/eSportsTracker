import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LolComponent } from './pages/lol/lol.component';
import { DotaComponent } from './pages/dota/dota.component';
import { AccountComponent } from './pages/account/account.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MatchComponent } from './pages/match/match.component';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LolComponent,
    DotaComponent,
    AccountComponent,
    HistoricComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignUpComponent,
    MatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    AvatarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PaginatorModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    ProgressSpinnerModule,
    TableModule,
    ProgressBarModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
