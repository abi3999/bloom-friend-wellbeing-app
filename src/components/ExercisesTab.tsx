
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exercises } from '@/data/exercises';
import ExerciseCard from './ExerciseCard';
import { motion } from 'framer-motion';

const ExercisesTab: React.FC = () => {
  const { completedExercises } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  
  // Group exercises by category
  const exercisesByCategory = exercises.reduce((acc, exercise) => {
    const { category } = exercise;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exercise);
    return acc;
  }, {} as Record<string, typeof exercises>);
  
  // Get filtered exercises based on active tab
  const getFilteredExercises = () => {
    if (activeTab === 'all') {
      return exercises;
    } else if (activeTab === 'completed') {
      return exercises.filter(exercise => completedExercises.includes(exercise.id));
    } else {
      return exercisesByCategory[activeTab] || [];
    }
  };
  
  const filteredExercises = getFilteredExercises();
  
  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
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
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Stress-Relief Exercises</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-4 md:p-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {Object.keys(exercisesByCategory).map(category => (
                    <TabsTrigger key={category} value={category}>
                      {formatCategoryName(category)}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredExercises.map(exercise => (
                      <ExerciseCard 
                        key={exercise.id}
                        exercise={exercise}
                        isCompleted={completedExercises.includes(exercise.id)}
                      />
                    ))}
                  </div>
                  
                  {filteredExercises.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No exercises found in this category.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExercisesTab;
