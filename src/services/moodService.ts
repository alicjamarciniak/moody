import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { MoodEntry } from '../types/mood';

const MOODS_COLLECTION = 'moods';

export async function saveMood(
  userId: string,
  mood: Omit<MoodEntry, 'id'>
): Promise<string> {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, MOODS_COLLECTION), {
    ...mood,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserMoods(userId: string): Promise<MoodEntry[]> {
  const db = getFirestore();
  const q = query(
    collection(db, MOODS_COLLECTION),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc: { id: string; data: () => Record<string, unknown> }) => ({
    id: doc.id,
    ...doc.data(),
  })) as MoodEntry[];
}
