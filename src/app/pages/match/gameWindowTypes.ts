export interface ParticipantMetadata {
  participantId: number;
  esportsPlayerId: string;
  summonerName: string;
  championId: string;
  role: string;
}

export interface TeamMetadata {
  esportsTeamId: string;
  participantMetadata: ParticipantMetadata[];
}

export interface GameMetadata {
  patchVersion: string;
  blueTeamMetadata: TeamMetadata;
  redTeamMetadata: TeamMetadata;
}

export interface ParticipantData {
  participantId: number;
  totalGold: number;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  creepScore: number;
  currentHealth: number;
  maxHealth: number;
}

export interface TeamData {
  totalGold: number;
  inhibitors: number;
  towers: number;
  barons: number;
  totalKills: number;
  dragons: any[]; // Altere para a interface correta, se houver
  participants: ParticipantData[];
}

export interface Frame {
  rfc460Timestamp: string;
  gameState: string;
  blueTeam: TeamData;
  redTeam: TeamData;
}

export interface GameWindow {
  esportsGameId: string;
  esportsMatchId: string;
  gameMetadata: GameMetadata;
  frames: Frame[];
}
