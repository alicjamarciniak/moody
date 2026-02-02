import { MoodEntry } from './mood';
import { Note } from './note';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  Main: undefined;
  Note: undefined;
  NoteDetails: { note: Note };
  MoodDetails: { mood: MoodEntry };
  Oversight: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Diary: undefined;
  Welcome: undefined;
  Tags: undefined;
  Entries: undefined;
};
