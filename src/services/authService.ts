import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId:
      '512571258179-kgcbv64agug7rcfi35r8qbkd7s2p2f7v.apps.googleusercontent.com',
  });
}

export async function signUp(
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> {
  return auth().createUserWithEmailAndPassword(email, password);
}

export async function signIn(
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> {
  return auth().signInWithEmailAndPassword(email, password);
}

export async function signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const response = await GoogleSignin.signIn();
  const idToken = response.data?.idToken;
  if (!idToken) {
    throw new Error('Google Sign-In failed: no idToken returned');
  }
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}

export async function firebaseSignOut(): Promise<void> {
  await auth().signOut();
}

export function onAuthStateChanged(
  callback: (user: FirebaseAuthTypes.User | null) => void
): () => void {
  return auth().onAuthStateChanged(callback);
}
