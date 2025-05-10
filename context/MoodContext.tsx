import React, { createContext, useContext, useState } from 'react';

type Mood = {
  happiness: number; // 1-10
  energy: number; // 1-10
  timestamp?: Date;
};

type MoodContextType = {
  currentMood: Mood | null;
  moodHistory: Mood[];
  updateMood: (mood: Mood) => void;
};

const MoodContext = createContext<MoodContextType>({
  currentMood: null,
  moodHistory: [],
  updateMood: () => {},
});

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<Mood | null>({
    happiness: 7,
    energy: 6,
    timestamp: new Date(),
  });
  const [moodHistory, setMoodHistory] = useState<Mood[]>([]);
  
  const updateMood = (mood: Mood) => {
    const newMood = { ...mood, timestamp: new Date() };
    setCurrentMood(newMood);
    
    // Add to history
    setMoodHistory(prev => [newMood, ...prev].slice(0, 20)); // Keep last 20 mood entries
  };
  
  return (
    <MoodContext.Provider value={{ currentMood, moodHistory, updateMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);