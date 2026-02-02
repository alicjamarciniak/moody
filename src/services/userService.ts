import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { AvatarKey, UserProfile } from '../types/user';

const USERS_COLLECTION = 'users';

export async function createUserProfile(
  userId: string,
  data: { avatar: AvatarKey; displayName: string }
): Promise<void> {
  const db = getFirestore();
  await setDoc(doc(db, USERS_COLLECTION, userId), {
    avatar: data.avatar,
    displayName: data.displayName,
    createdAt: serverTimestamp(),
  });
}

export async function updateUserProfile(
  userId: string,
  data: { avatar: AvatarKey; displayName: string }
): Promise<void> {
  const db = getFirestore();
  await setDoc(doc(db, USERS_COLLECTION, userId), {
    avatar: data.avatar,
    displayName: data.displayName,
  }, { merge: true });
}

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, userId));
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() } as UserProfile;
}
