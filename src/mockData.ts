import { Team, Player, Match, Venue } from './types';

export const TEAMS: Team[] = [
  { id: 'csk', name: 'Chennai Super Kings', shortName: 'CSK', primaryColor: '#FDB913', secondaryColor: '#00266F' },
  { id: 'mi', name: 'Mumbai Indians', shortName: 'MI', primaryColor: '#004BA0', secondaryColor: '#D1AB3E' },
  { id: 'rcb', name: 'Royal Challengers Bengaluru', shortName: 'RCB', primaryColor: '#2B2A29', secondaryColor: '#EC1C24' },
  { id: 'kkr', name: 'Kolkata Knight Riders', shortName: 'KKR', primaryColor: '#3A225D', secondaryColor: '#ECC542' },
  { id: 'gt', name: 'Gujarat Titans', shortName: 'GT', primaryColor: '#1B2133', secondaryColor: '#CFB53B' },
  { id: 'rr', name: 'Rajasthan Royals', shortName: 'RR', primaryColor: '#EA1A85', secondaryColor: '#004B8D' },
  { id: 'dc', name: 'Delhi Capitals', shortName: 'DC', primaryColor: '#000080', secondaryColor: '#FF1100' },
  { id: 'lsg', name: 'Lucknow Super Giants', shortName: 'LSG', primaryColor: '#00008B', secondaryColor: '#FFD700' },
  { id: 'srh', name: 'Sunrisers Hyderabad', shortName: 'SRH', primaryColor: '#FF822A', secondaryColor: '#000000' },
  { id: 'pbks', name: 'Punjab Kings', shortName: 'PBKS', primaryColor: '#ED1B24', secondaryColor: '#D1AB3E' }
];

export const VENUES: Venue[] = [
  { 
    id: 'narendra', 
    name: 'Narendra Modi Stadium', 
    city: 'Ahmedabad', 
    capacity: 132000,
    imageUrl: 'https://images.unsplash.com/photo-1540744158920-a88745367616?q=80&w=1000&auto=format&fit=crop',
    pitchType: 'Balanced',
    avgFirstInn: 175,
    avgSecondInn: 160,
    highestChase: 205,
    batFirstWinProb: 55,
    tossImpact: 'High (Bat first)',
    historicalMatchCount: 27
  },
  { 
    id: 'wankhede', 
    name: 'Wankhede Stadium', 
    city: 'Mumbai', 
    capacity: 33000,
    imageUrl: 'https://images.unsplash.com/photo-1594474038208-d218d6a45447?q=80&w=1000&auto=format&fit=crop',
    pitchType: 'Batting-friendly',
    avgFirstInn: 185,
    avgSecondInn: 178,
    highestChase: 214,
    batFirstWinProb: 48,
    tossImpact: 'Moderate (Chasing)',
    historicalMatchCount: 102
  },
  { 
    id: 'chepauk', 
    name: 'M. A. Chidambaram Stadium', 
    city: 'Chennai', 
    capacity: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1531415064977-947702f2aa37?q=80&w=1000&auto=format&fit=crop',
    pitchType: 'Spin-friendly',
    avgFirstInn: 165,
    avgSecondInn: 155,
    highestChase: 192,
    batFirstWinProb: 58,
    tossImpact: 'High (Bat first)',
    historicalMatchCount: 76
  },
  { 
    id: 'chinnaswamy', 
    name: 'M. Chinnaswamy Stadium', 
    city: 'Bengaluru', 
    capacity: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1589485237202-7f28ed6f5773?q=80&w=1000&auto=format&fit=crop',
    pitchType: 'Batting-friendly',
    avgFirstInn: 195,
    avgSecondInn: 185,
    highestChase: 215,
    batFirstWinProb: 45,
    tossImpact: 'Low (Chasing)',
    historicalMatchCount: 88
  },
  { 
    id: 'eden', 
    name: 'Eden Gardens', 
    city: 'Kolkata', 
    capacity: 68000,
    imageUrl: 'https://images.unsplash.com/photo-1588720845347-f0c3d98762ef?q=80&w=1000&auto=format&fit=crop',
    pitchType: 'Balanced',
    avgFirstInn: 180,
    avgSecondInn: 172,
    highestChase: 201,
    batFirstWinProb: 50,
    tossImpact: 'Moderate',
    historicalMatchCount: 86
  }
];

export const MATCHES: Match[] = [
  { id: 'm1', team1Id: 'csk', team2Id: 'rcb', date: '2026-03-22T19:30:00Z', venue: 'chepauk', status: 'upcoming' },
  { id: 'm2', team1Id: 'mi', team2Id: 'gt', date: '2026-03-23T19:30:00Z', venue: 'wankhede', status: 'upcoming' },
  { id: 'm3', team1Id: 'kkr', team2Id: 'srh', date: '2026-03-24T19:30:00Z', venue: 'eden', status: 'upcoming' }
];

export const PLAYERS: Player[] = [
  { id: 'v_kohli', name: 'Virat Kohli', teamId: 'rcb', role: 'Batsman', runs: 7263, wickets: 4, matches: 237, battingAvg: 37.2, strikeRate: 130.0 },
  { id: 'ms_dhoni', name: 'MS Dhoni', teamId: 'csk', role: 'Wicketkeeper', runs: 5082, wickets: 0, matches: 250, battingAvg: 38.8, strikeRate: 135.9 },
  { id: 'r_sharma', name: 'Rohit Sharma', teamId: 'mi', role: 'Batsman', runs: 6211, wickets: 15, matches: 243, battingAvg: 29.6, strikeRate: 130.0 },
  { id: 'g_maxwell', name: 'Glenn Maxwell', teamId: 'rcb', role: 'All-rounder', runs: 2719, wickets: 31, matches: 124, battingAvg: 25.0, strikeRate: 157.0 },
  { id: 'r_rashid', name: 'Rashid Khan', teamId: 'gt', role: 'Bowler', runs: 443, wickets: 139, matches: 109, battingAvg: 13.0, strikeRate: 166.0, economy: 6.6 }
];
