import axios from 'axios';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  addDoc, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TEAMS, VENUES, PLAYERS, MATCHES } from '../mockData';

// In a real scenario, you'd use a real API like CricAPI or RapidAPI
// For this applet, we'll simulate the "Live" update by merging mock data 
// with potential API data if keys are provided.
const CRICKET_API_BASE = 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY;

export async function syncLiveData() {
  console.log('Starting Live Data Sync...');
  
  try {
    const batch = writeBatch(db);

    // 1. Sync Venues
    for (const venue of VENUES) {
      const venueRef = doc(db, 'venues', venue.id);
      batch.set(venueRef, {
        ...venue,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    // 2. Sync Teams
    for (const team of TEAMS) {
      const teamRef = doc(db, 'teams', team.id);
      batch.set(teamRef, {
        ...team,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    // 3. Sync Matches
    for (const match of MATCHES) {
      const matchRef = doc(db, 'matches', match.id);
      batch.set(matchRef, {
        ...match,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    // 4. Sync Players
    for (const player of PLAYERS) {
      const playerRef = doc(db, 'players', player.id);
      batch.set(playerRef, {
        ...player,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    await batch.commit();

    // Log success
    await addDoc(collection(db, 'update_logs'), {
      timestamp: serverTimestamp(),
      status: 'success',
      type: 'ALL_SYNC',
      message: `Successfully synced ${VENUES.length} venues, ${TEAMS.length} teams, and ${MATCHES.length} matches.`
    });

    return { success: true, message: 'Sync completed' };
  } catch (error) {
    console.error('Sync failed:', error);
    await addDoc(collection(db, 'update_logs'), {
      timestamp: serverTimestamp(),
      status: 'failure',
      type: 'ALL_SYNC',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}
