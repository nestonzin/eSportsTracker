export interface eventDetails extends Iterable<Data> {
  data: Data;
}

export interface Data {
  event: Event;
}

export interface Event {
  id: string;
  type: string;
  tournament: Tournament;
  league: League;
  match: Match;
  streams: any[];
}

export interface Tournament {
  id: string;
}

export interface League {
  id: string;
  slug: string;
  image: string;
  name: string;
}

export interface Match {
  strategy: Strategy;
  teams: Team[];
  games: Game[];
}

export interface Strategy {
  count: number;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  image: string;
  result: Result;
}

export interface Result {
  gameWins: number;
}

export interface Game {
  number: number;
  id: string;
  state: string;
  teams: Team2[];
  vods: any[];
}

export interface Team2 {
  id: string;
  side: string;
}
