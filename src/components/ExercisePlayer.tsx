
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Exercise } from '@/types';
import { Check, Clock, ArrowLeft } from 'lucide-react';

const ExercisePlayer: React.FC = () => {
  const { currentExercise, markExerciseCompleted, exerciseInProgress, setExerciseInProgress } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Redirect if no exercise is selected
    if (!currentExercise) {
      navigate('/home');
      return;
    }

    // Reset the exercise state
    setCurrentStep(0);
    setTimeRemaining(currentExercise.duration);
    setIsComplete(false);
  }, [currentExercise, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (exerciseInProgress && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (exerciseInProgress && timeRemaining === 0) {
      // Exercise is complete
      setIsComplete(true);
      setExerciseInProgress(false);
      if (currentExercise) {
        markExerciseCompleted(currentExercise.id);
      }
    }
    
    return () => clearTimeout(timer);
  }, [exerciseInProgress, timeRemaining, markExerciseCompleted, currentExercise, setExerciseInProgress]);

  if (!currentExercise) return null;

  const startExercise = () => {
    setExerciseInProgress(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = ((currentExercise.duration - timeRemaining) / currentExercise.duration) * 100;

  const handleNextStep = () => {
    if (currentStep < currentExercise.instructions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/home')}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">{currentExercise.title}</h1>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {isComplete ? (
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="bg-green-100 p-4 rounded-full">
                  <Check size={48} className="text-green-600" />
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Exercise Complete!</h2>
              <p className="text-gray-600 mb-6">
                Great job completing {currentExercise.title}. How do you feel now?
              </p>
              <Button onClick={() => navigate('/home')}>
                Return to Dashboard
              </Button>
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              {!exerciseInProgress ? (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4">{currentExercise.title}</h2>
                  <p className="text-gray-600 mb-4">{currentExercise.description}</p>
                  <div className="flex items-center justify-center mb-6">
                    <Clock size={20} className="text-blue-500 mr-2" />
                    <span>{formatTime(currentExercise.duration)}</span>
                  </div>
                  <Button onClick={startExercise} className="px-8">
                    Start Exercise
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Time Remaining</span>
                      <span className="text-sm font-medium">{formatTime(timeRemaining)}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 rounded-lg p-4 mb-6"
                  >
                    <h3 className="font-semibold mb-2">Step {currentStep + 1} of {currentExercise.instructions.length}</h3>
                    <p>{currentExercise.instructions[currentStep]}</p>
                  </motion.div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      onClick={handleNextStep}
                      disabled={currentStep === currentExercise.instructions.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExercisePlayer;
