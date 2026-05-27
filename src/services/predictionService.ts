import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, auth, OperationType, handleFirestoreError } from '../lib/firebase';
import { Prediction } from '../types';

const COLLECTION_NAME = 'predictions';

export const predictionService = {
  async savePrediction(predictionData: Omit<Prediction, 'id' | 'timestamp'>) {
    if (!auth.currentUser) return null;

    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...predictionData,
        userId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    }
  },

  async getUserPredictions() {
    if (!auth.currentUser) return [];

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Prediction[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  }
};
