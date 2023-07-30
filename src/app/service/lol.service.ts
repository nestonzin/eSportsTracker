import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { ISchedule } from '../pages/home/schedulesTypes';
import { gameWindow } from '../pages/match/gameWindowTypes';
import { gameDetails } from '../pages/match/gameDetailsTypes';
import { eventDetails } from '../pages/match/gameEventDetailsTypes';

@Injectable({
  providedIn: 'root',
})
export class LolService {
  private apiUrl =
    'https://esports-api.lolesports.com/persisted/gw/getSchedule';

  private EventMatch = 'https://feed.lolesports.com/livestats/v1';

  eventDetails =
    'https://esports-api.lolesports.com/persisted/gw/getEventDetails';

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

  getGameWindow(gameId: string, startingTime: string): Observable<gameWindow> {
    const url = `${this.EventMatch}/window/${gameId}`;
    return this.http.get<gameWindow>(url, {
      headers: this.headers,
      params: { hl: 'pt-BR', startingTime },
    });
  }

  getLiveDetails(gameId: string, startingTime: string): Observable<any> {
    const url = `${this.EventMatch}/details/${gameId}`;
    return this.http.get(url, {
      headers: this.headers,
      params: { hl: 'pt-BR', startingTime },
    });
  }

  getEventDetails(gameId: string): Observable<eventDetails> {
    const url = `${this.eventDetails}?hl=pt-BR&id=${gameId}`;
    return this.http.get<eventDetails>(url, { headers: this.headers }).pipe(
      map((response: any) => {
        return response as eventDetails;
      })
    );
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
