import firestore from '@react-native-firebase/firestore';
import { MoodEntry } from '../types/mood';

const MOODS_COLLECTION = 'moods';

export async function saveMood(
  userId: string,
  mood: Omit<MoodEntry, 'id'>
): Promise<string> {
  const docRef = await firestore()
    .collection(MOODS_COLLECTION)
    .add({
      ...mood,
      userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
}

export async function getUserMoods(userId: string): Promise<MoodEntry[]> {
  const snapshot = await firestore()
    .collection(MOODS_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MoodEntry[];
}
