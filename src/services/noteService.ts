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
import { Note } from '../types/note';

const NOTES_COLLECTION = 'notes';

export async function saveNote(
  userId: string,
  note: Omit<Note, 'id'>
): Promise<string> {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
    ...note,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserNotes(userId: string): Promise<Note[]> {
  const db = getFirestore();
  const q = query(
    collection(db, NOTES_COLLECTION),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc')
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc: { id: string; data: () => Record<string, unknown> }) => ({
    id: doc.id,
    ...doc.data(),
  })) as Note[];
}
