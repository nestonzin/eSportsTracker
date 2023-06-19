import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DotaService {
  private baseUrl = 'https://api.opendota.com/api';

  constructor(private http: HttpClient) {}

  getDotaProMatches(): Observable<any> {
    const url = `${this.baseUrl}/proMatches`;
    return this.http.get(url);
  }

  getDotaLeagueMatches(leagueId: number): Observable<any> {
    const url = `${this.baseUrl}/leagues/${leagueId}/matches`;
    return this.http.get(url);
  }
}
