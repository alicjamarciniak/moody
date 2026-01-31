import firestore from '@react-native-firebase/firestore';
import { Note } from '../types/note';

const NOTES_COLLECTION = 'notes';

export async function saveNote(
  userId: string,
  note: Omit<Note, 'id'>
): Promise<string> {
  const docRef = await firestore()
    .collection(NOTES_COLLECTION)
    .add({
      ...note,
      userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  return docRef.id;
}

export async function getUserNotes(userId: string): Promise<Note[]> {
  const snapshot = await firestore()
    .collection(NOTES_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Note[];
}
