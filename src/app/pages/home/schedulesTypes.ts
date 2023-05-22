export interface ISchedule {
  data: Data;
}

export interface Data {
  schedule: Schedule;
}

export interface Schedule {
  pages: Pages;
  events: Event[];
}

export interface Pages {
  older: string;
  newer: string;
}

export interface Event {
  startTime: string;
  state: string;
  type: string;
  blockName?: string;
  league: League;
  match?: Match;
}

export interface League {
  name: string;
  slug: string;
  image?: string;
}

export interface Match {
  id: string;
  flags: string[];
  teams: Team[];
  strategy: Strategy;
}

export interface Team {
  name: string;
  code: string;
  image: string;
  result: Result;
  record: Record;
}

export interface Result {
  outcome?: string;
  gameWins: number;
}

export interface Record {
  wins: number;
  losses: number;
}

export interface Strategy {
  type: string;
  count: number;
}
