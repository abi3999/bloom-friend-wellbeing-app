
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, isToday, isYesterday, parseISO } from 'date-fns';

const ProgressTab: React.FC = () => {
  const { moodHistory, completedExercises } = useApp();

  // Format mood history for the chart
  const formatMoodData = () => {
    // Generate data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return {
        date: date,
        dateString: format(date, 'yyyy-MM-dd'),
        formattedDate: format(date, 'MMM dd'),
        count: 0
      };
    }).reverse();

    // Count moods for each day
    moodHistory.forEach(entry => {
      const entryDate = format(parseISO(entry.date), 'yyyy-MM-dd');
      const dayData = last7Days.find(day => day.dateString === entryDate);
      if (dayData) {
        dayData.count += 1;
      }
    });

    return last7Days;
  };

  const moodChartData = formatMoodData();

  // Format date for display
  const formatDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd');
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
              <CardTitle className="text-xl md:text-2xl">Your Progress</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Check-ins</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moodChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis width={30} />
                  <Tooltip 
                    formatter={(value) => [`${value} check-ins`, 'Mood Entries']}
                    labelFormatter={(label) => formatDate(new Date(label))}
                  />
                  <Bar 
                    dataKey="count" 
                    name="Mood Entries" 
                    fill="#60a5fa" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-500 mb-2">
                    {completedExercises.length}
                  </div>
                  <p className="text-gray-500">Total exercises completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mood Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-500 mb-2">
                    {moodHistory.length}
                  </div>
                  <p className="text-gray-500">Total mood check-ins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProgressTab;
