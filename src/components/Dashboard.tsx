
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecommendedExercises } from '@/data/exercises';
import ExerciseCard from './ExerciseCard';
import { motion } from 'framer-motion';
import TherapyChatBot from './TherapyChatBot';

const Dashboard: React.FC = () => {
  const { currentMood, completedExercises } = useApp();
  
  // Get recommended exercises based on current mood
  const recommendedExercises = getRecommendedExercises(currentMood?.emoji, 3);
  
  // Determine background gradient based on mood
  const getBgClass = () => {
    if (!currentMood) return 'bg-gray-100';
    
    switch (currentMood.color) {
      case 'stress': return 'bg-stress-gradient';
      case 'calm': return 'bg-calm-gradient';
      case 'energy': return 'bg-energy-gradient';
      case 'balance': return 'bg-balance-gradient';
      case 'drain': return 'bg-drain-gradient';
      default: return 'bg-gray-100';
    }
  };
  
  // Daily tips based on mood
  const getDailyTips = () => {
    if (!currentMood) return { avoid: [], do: [] };
    
    const tips = {
      happy: {
        avoid: ['Overcommitting yourself', 'Ignoring your limits', 'Caffeine overload'],
        do: ['Share your positivity', 'Journal your good moments', 'Plan something fun']
      },
      sad: {
        avoid: ['Social isolation', 'Negative self-talk', 'Doomscrolling'],
        do: ['Reach out to a friend', 'Get some sunlight', 'Gentle movement']
      },
      angry: {
        avoid: ['Making important decisions', 'Caffeine', 'Social media debates'],
        do: ['Physical exercise', 'Deep breathing', 'Express your feelings']
      },
      tired: {
        avoid: ['Caffeine after 2pm', 'Blue light before bed', 'Heavy meals'],
        do: ['20-minute power nap', 'Stay hydrated', 'Light stretching']
      },
      neutral: {
        avoid: ['Overthinking', 'Information overload', 'Skipping meals'],
        do: ['Try something new', 'Connect with nature', 'Practice mindfulness']
      },
      hopeful: {
        avoid: ['Perfectionism', 'Comparing to others', 'Rushing progress'],
        do: ['Set small goals', 'Celebrate wins', 'Express gratitude']
      }
    };
    
    return tips[currentMood.emoji] || { avoid: [], do: [] };
  };
  
  const dailyTips = getDailyTips();
  const dailyAffirmation = "Your emotions are valid messengers, not permanent states.";
  
  // Animation variants
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
    <div className={`min-h-screen p-4 md:p-6 ${getBgClass()}`}>
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Welcome back {currentMood ? `• Feeling ${currentMood.emoji}` : ''}
              </CardTitle>
              <CardDescription>
                Your personalized dashboard for mental wellbeing
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        
        {/* Exercises Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>🫧 Stress-Relief Exercises</CardTitle>
              <CardDescription>
                Activities tailored to your current mood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedExercises.map(exercise => (
                  <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    isCompleted={completedExercises.includes(exercise.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Daily Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>📉 Stress Levels Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-medium text-red-500 mb-2">Avoid Today:</h3>
                  <ul className="space-y-2">
                    {dailyTips.avoid.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="inline-block w-6 h-6 rounded-full bg-red-100 text-red-500 text-center mr-2">
                          ✖
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-green-500 mb-2">Do Today:</h3>
                  <ul className="space-y-2">
                    {dailyTips.do.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="inline-block w-6 h-6 rounded-full bg-green-100 text-green-500 text-center mr-2">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>🌱 Daily Affirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-full">
                  <blockquote className="italic text-lg text-center font-serif p-6 border-l-4 border-blue-300">
                    "{dailyAffirmation}"
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Chat Bot Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>💬 Therapy Chat Bot</CardTitle>
              <CardDescription>
                Talk to Bloom, your AI wellbeing companion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TherapyChatBot />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
