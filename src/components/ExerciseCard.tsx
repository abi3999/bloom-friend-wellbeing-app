
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Exercise } from '@/types';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted }) => {
  const { setCurrentExercise } = useApp();
  const navigate = useNavigate();
  
  const handleStartExercise = () => {
    setCurrentExercise(exercise);
    navigate('/exercise');
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };
  
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${
      isCompleted ? 'border-green-300' : ''
    }`}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{exercise.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 mb-2">{formatDuration(exercise.duration)}</p>
        <p className="text-sm line-clamp-2">{exercise.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleStartExercise}
          className="w-full hover-scale"
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? "Do Again" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
