import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LolComponent } from './lol/lol.component';
import { DotaComponent } from './dota/dota.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LolComponent,
    DotaComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    AvatarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
