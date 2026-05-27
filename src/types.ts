export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
  image?: string;
  matches: number;
  runs: number;
  wickets: number;
  battingAvg: number;
  strikeRate: number;
  economy?: number;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  date: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  winnerId?: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity?: number;
  imageUrl?: string;
  pitchType: string;
  avgFirstInn: number;
  avgSecondInn: number;
  highestChase: number;
  batFirstWinProb: number;
  tossImpact: string;
  historicalMatchCount: number;
  lat?: number;
  lng?: number;
}

export type VenueStats = Venue; // For compatibility

export interface Prediction {
  id: string;
  matchId: string;
  userId: string;
  predictedWinnerId: string;
  winProbability: {
    [teamId: string]: number;
  };
  confidence: number;
  aiExplanation: string;
  timestamp: any;
}
