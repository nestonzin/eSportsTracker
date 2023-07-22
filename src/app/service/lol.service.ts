import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISchedule } from '../pages/home/schedulesTypes';
import { GameWindow } from '../pages/match/gameWindowTypes';

@Injectable({
  providedIn: 'root',
})
export class LolService {
  private apiUrl =
    'https://esports-api.lolesports.com/persisted/gw/getSchedule';

  private apiMatchWindow = 'https://feed.lolesports.com/livestats/v1/window';

  private apiMatchLiveDetails =
    'https://feed.lolesports.com/livestats/v1/details';

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
  });

  getSchedule(): Observable<ISchedule> {
    return this.http.get<ISchedule>(this.apiUrl, {
      headers: this.headers,
      params: { hl: 'pt-BR' },
    });
  }

  getGameWindow(gameId: string, startingTime: string): Observable<GameWindow> {
    const url = `${this.apiMatchWindow}/${gameId}`;
    return this.http.get<GameWindow>(url, {
      headers: this.headers,
      params: { hl: 'pt-BR', startingTime },
    });
  }

  getLiveDetails(gameId: string, startingTime: string): Observable<any> {
    const url = `${this.apiMatchLiveDetails}/${gameId}`;
    return this.http.get(url, {
      headers: this.headers,
      params: { hl: 'pt-BR', startingTime },
    });
  }

  getISOMultiplyOf10() {
    const date = new Date();
    date.setMilliseconds(0);
    if (date.getSeconds() % 10 !== 0) {
      date.setSeconds(date.getSeconds() - (date.getSeconds() % 10));
    }
    date.setSeconds(date.getSeconds() - 60);
    return date.toISOString();
  }
}
