
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mood, MoodColor, MoodSelection } from '@/types';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

const emojis: Record<Mood, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😡',
  tired: '🥱',
  neutral: '😐',
  hopeful: '🌈'
};

const colorGradients: Record<MoodColor, string> = {
  stress: 'bg-stress-gradient',
  calm: 'bg-calm-gradient',
  energy: 'bg-energy-gradient',
  balance: 'bg-balance-gradient',
  drain: 'bg-drain-gradient'
};

const colorLabels: Record<MoodColor, string> = {
  stress: 'Stress',
  calm: 'Calm',
  energy: 'Energy',
  balance: 'Balance',
  drain: 'Drain'
};

export const MoodCheckIn: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<Mood | null>(null);
  const [selectedColor, setSelectedColor] = useState<MoodColor | null>(null);
  const { setCurrentMood, addMoodEntry, setHasCompletedOnboarding } = useApp();
  const navigate = useNavigate();

  const handleEmojiSelect = (mood: Mood) => {
    setSelectedEmoji(mood);
  };

  const handleColorSelect = (color: MoodColor) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    if (selectedEmoji && selectedColor) {
      const moodSelection: MoodSelection = {
        emoji: selectedEmoji,
        color: selectedColor
      };
      
      setCurrentMood(moodSelection);
      
      // Add to mood history
      addMoodEntry({
        date: new Date().toISOString(),
        mood: selectedEmoji,
        color: selectedColor
      });
      
      setHasCompletedOnboarding(true);
      navigate('/insights');
    }
  };

  // Determine if the user has selected both an emoji and a color
  const canProceed = selectedEmoji !== null && selectedColor !== null;

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-50 to-blue-100">
      <motion.div 
        className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">How are you feeling today?</h1>
        
        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-lg font-medium mb-4 text-gray-700">Choose an emoji that represents your mood:</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(emojis).map(([mood, emoji]) => (
              <motion.button
                key={mood}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-4xl p-3 rounded-xl transition-all ${
                  selectedEmoji === mood 
                    ? 'bg-blue-100 shadow-md scale-110' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleEmojiSelect(mood as Mood)}
                aria-label={`Select ${mood} mood`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-lg font-medium mb-4 text-gray-700">Now pick a color that matches your energy:</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(colorGradients).map(([colorKey, gradientClass]) => (
              <motion.button
                key={colorKey}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-16 rounded-xl transition-all ${gradientClass} ${
                  selectedColor === colorKey 
                    ? 'ring-4 ring-blue-400 scale-110' 
                    : 'ring-1 ring-gray-200'
                }`}
                onClick={() => handleColorSelect(colorKey as MoodColor)}
                aria-label={`Select ${colorLabels[colorKey as MoodColor]} energy`}
              >
                <span className="sr-only">{colorLabels[colorKey as MoodColor]}</span>
              </motion.button>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-sm text-gray-500">
              {selectedColor ? `Selected: ${colorLabels[selectedColor]}` : 'Select a color'}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: canProceed ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          onClick={handleSubmit}
          disabled={!canProceed}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all"
        >
          Let's Go! →
        </Button>
      </motion.div>
    </div>
  );
};

export default MoodCheckIn;
