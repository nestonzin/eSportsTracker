import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISchedule } from '../pages/home/schedulesTypes';

@Injectable({
  providedIn: 'root',
})
export class LolService {
  private apiUrl =
    'https://esports-api.lolesports.com/persisted/gw/getSchedule';

  private apiMatchWindow = 'https://feed.lolesports.com/livestats/v1/window';

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
  });

  getSchedule(): Observable<ISchedule> {
    const params = new HttpParams().set('hl', 'pt-BR');

    return this.http.get<ISchedule>(this.apiUrl, {
      headers: this.headers,
      params: params,
    });
  }

  getGameWindow(gameId: string): Observable<any> {
    const url = `${this.apiMatchWindow}/${gameId}`;
    const params = new HttpParams().set('hl', 'pt-BR');
    return this.http.get(url, { headers: this.headers, params });
  }
}
