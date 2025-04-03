
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodSelection, Mood, MoodColor, MoodEntry, ChatMessage, Exercise } from '@/types';

interface AppContextType {
  currentMood: MoodSelection | null;
  setCurrentMood: (mood: MoodSelection) => void;
  moodHistory: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  completedExercises: string[];
  markExerciseCompleted: (exerciseId: string) => void;
  currentExercise: Exercise | null;
  setCurrentExercise: (exercise: Exercise | null) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  exerciseInProgress: boolean;
  setExerciseInProgress: (inProgress: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<MoodSelection | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [exerciseInProgress, setExerciseInProgress] = useState<boolean>(false);

  // Load data from localStorage on initial load
  useEffect(() => {
    const storedMood = localStorage.getItem('currentMood');
    const storedMoodHistory = localStorage.getItem('moodHistory');
    const storedChatMessages = localStorage.getItem('chatMessages');
    const storedCompletedExercises = localStorage.getItem('completedExercises');
    const storedOnboarding = localStorage.getItem('hasCompletedOnboarding');

    if (storedMood) setCurrentMood(JSON.parse(storedMood));
    if (storedMoodHistory) setMoodHistory(JSON.parse(storedMoodHistory));
    if (storedChatMessages) setChatMessages(JSON.parse(storedChatMessages));
    if (storedCompletedExercises) setCompletedExercises(JSON.parse(storedCompletedExercises));
    if (storedOnboarding) setHasCompletedOnboarding(JSON.parse(storedOnboarding));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (currentMood) localStorage.setItem('currentMood', JSON.stringify(currentMood));
    if (moodHistory.length) localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    if (chatMessages.length) localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    if (completedExercises.length) localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
    localStorage.setItem('hasCompletedOnboarding', JSON.stringify(hasCompletedOnboarding));
  }, [currentMood, moodHistory, chatMessages, completedExercises, hasCompletedOnboarding]);

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodHistory(prev => [entry, ...prev]);
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const markExerciseCompleted = (exerciseId: string) => {
    setCompletedExercises(prev => {
      if (!prev.includes(exerciseId)) {
        return [...prev, exerciseId];
      }
      return prev;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentMood,
        setCurrentMood,
        moodHistory,
        addMoodEntry,
        chatMessages,
        addChatMessage,
        completedExercises,
        markExerciseCompleted,
        currentExercise,
        setCurrentExercise,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        exerciseInProgress,
        setExerciseInProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
