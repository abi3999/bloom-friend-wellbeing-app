
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { generateMoodInsights } from '@/utils/aiUtils';

const MoodInsights: React.FC = () => {
  const { currentMood } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If no mood data, redirect to check-in
    if (!currentMood) {
      navigate('/');
    }
  }, [currentMood, navigate]);

  if (!currentMood) return null;

  const insights = generateMoodInsights(currentMood);
  const emoji = currentMood.emoji;
  const colorClass = `bg-${currentMood.color}-gradient`;

  // Determine background class based on the selected color
  const getBgClass = () => {
    switch (currentMood.color) {
      case 'stress': return 'bg-stress-gradient';
      case 'calm': return 'bg-calm-gradient';
      case 'energy': return 'bg-energy-gradient';
      case 'balance': return 'bg-balance-gradient';
      case 'drain': return 'bg-drain-gradient';
      default: return 'bg-gray-100';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${getBgClass()}`}>
      <motion.div 
        className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 text-blue-600">Here's what I'm sensing...</h1>
          <p className="text-gray-600">Based on your mood: {emoji}</p>
        </div>
        
        <motion.div
          className="space-y-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              animate={{ 
                boxShadow: [
                  "0px 4px 8px rgba(0, 0, 0, 0.05)",
                  "0px 6px 12px rgba(0, 0, 0, 0.1)",
                  "0px 4px 8px rgba(0, 0, 0, 0.05)"
                ],
                transition: { 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2 
                }
              }}
            >
              <p className="text-gray-800">{insight}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/home')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all"
          >
            Next Step →
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MoodInsights;
