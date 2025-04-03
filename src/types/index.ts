
export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'neutral' | 'hopeful' | 'anxious' | 'stressed' | 'overwhelmed' | 'frustrated' | 'restless';
export type MoodColor = 'stress' | 'calm' | 'energy' | 'balance' | 'drain';

export interface MoodSelection {
  emoji: Mood;
  color: MoodColor;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: 'breathing' | 'meditation' | 'physical' | 'cognitive';
  moodRecommended: Mood[];
  instructions: string[];
  imageUrl?: string;
}

export interface MoodEntry {
  date: string;
  mood: Mood;
  color: MoodColor;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface Guide {
  id: string;
  title: string;
  category: 'crisis' | 'sleep' | 'study';
  content: string;
  imageUrl?: string;
}
