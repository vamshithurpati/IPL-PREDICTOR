import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Team, Player, Match, Venue } from '../types';
import { TEAMS, PLAYERS, MATCHES, VENUES } from '../mockData';

export const dataService = {
  async getTeams(): Promise<Team[]> {
    try {
      const snapshot = await getDocs(collection(db, 'teams'));
      if (snapshot.empty) return TEAMS;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Team[];
    } catch {
      return TEAMS;
    }
  },

  async getVenues(): Promise<Venue[]> {
    try {
      const snapshot = await getDocs(collection(db, 'venues'));
      if (snapshot.empty) return VENUES;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Venue[];
    } catch {
      return VENUES;
    }
  },

  async getPlayers(): Promise<Player[]> {
    try {
      const snapshot = await getDocs(collection(db, 'players'));
      if (snapshot.empty) return PLAYERS;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Player[];
    } catch {
      return PLAYERS;
    }
  },

  async getMatches(): Promise<Match[]> {
    try {
      const q = query(collection(db, 'matches'), orderBy('date', 'asc'));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return MATCHES;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Match[];
    } catch {
      return MATCHES;
    }
  }
};
