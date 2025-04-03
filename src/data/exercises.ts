
import { Exercise } from '@/types';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: '5-4-3-2-1 Grounding',
    description: 'A sensory awareness exercise to help manage anxiety and stress by reconnecting to the present moment.',
    duration: 300, // 5 minutes
    category: 'cognitive',
    moodRecommended: ['anxious', 'angry', 'sad'],
    instructions: [
      'Find a comfortable position and take a few deep breaths.',
      'Look around and name 5 things you can see.',
      'Notice 4 things you can touch or feel with your body.',
      'Listen for 3 things you can hear right now.',
      'Identify 2 things you can smell (or like the smell of).',
      'Name 1 thing you can taste (or like the taste of).',
      'Take a deep breath and notice how you feel more grounded now.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    title: 'Power Nap Audio',
    description: 'A guided 20-minute power nap to refresh your mind and restore energy.',
    duration: 1200, // 20 minutes
    category: 'meditation',
    moodRecommended: ['tired', 'stressed', 'overwhelmed'],
    instructions: [
      'Find a quiet, comfortable place to lie down.',
      'Close your eyes and follow the guided audio.',
      'Allow yourself to drift into a light sleep if it happens naturally.',
      'When the gentle alarm sounds, take a few deep breaths before sitting up.',
      'Stretch your body gently before resuming your activities.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2xlZXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    title: 'Angry Doodle Pad',
    description: 'Express your frustration through spontaneous art - no skill required.',
    duration: 300, // 5 minutes
    category: 'cognitive',
    moodRecommended: ['angry', 'frustrated', 'restless'],
    instructions: [
      'Take deep breaths and set a timer for 5 minutes.',
      'Draw whatever comes to mind - scribbles, shapes, or words.',
      'Don\'t judge your art - this is about expression, not perfection.',
      'Use bold, quick strokes if you\'re feeling intense emotions.',
      'When finished, notice if your emotions have shifted at all.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRyYXd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    title: '4-7-8 Breathing',
    description: 'A calming breathing technique to reduce anxiety and help with sleep.',
    duration: 180, // 3 minutes
    category: 'breathing',
    moodRecommended: ['anxious', 'stressed', 'tired'],
    instructions: [
      'Sit or lie in a comfortable position with your back straight.',
      'Place the tip of your tongue against the roof of your mouth, just behind your front teeth.',
      'Exhale completely through your mouth, making a whoosh sound.',
      'Close your mouth and inhale quietly through your nose to a count of 4.',
      'Hold your breath for a count of 7.',
      'Exhale completely through your mouth, making a whoosh sound, to a count of 8.',
      'Repeat this cycle 3-4 times initially, working up to 8 cycles with practice.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    title: 'Box Breathing',
    description: 'A simple breathing technique used by Navy SEALs to reduce stress and improve focus.',
    duration: 180, // 3 minutes
    category: 'breathing',
    moodRecommended: ['stressed', 'anxious', 'overwhelmed'],
    instructions: [
      'Sit upright in a comfortable position.',
      'Slowly exhale all your breath.',
      'Inhale slowly through your nose to a count of 4.',
      'Hold your breath for a count of 4.',
      'Exhale slowly through your mouth to a count of 4.',
      'Hold your breath (empty lungs) for a count of 4.',
      'Repeat this pattern for 3-5 minutes or until you feel calmer.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '6',
    title: 'Quick Body Scan',
    description: 'A brief mindfulness practice to check in with your body and release tension.',
    duration: 300, // 5 minutes
    category: 'meditation',
    moodRecommended: ['stressed', 'tired', 'anxious'],
    instructions: [
      'Sit or lie down in a comfortable position.',
      'Close your eyes and take a few deep breaths.',
      'Bring awareness to your feet and toes, noticing any sensations.',
      'Slowly move your attention up through your legs, abdomen, chest, arms, hands, neck, and head.',
      'At each part of your body, notice any tension and consciously relax that area.',
      'Take a final deep breath, feeling your whole body relax.',
      'Open your eyes, noticing how your body feels now.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '7',
    title: 'Joy Stretching',
    description: 'Simple stretches designed to release tension and boost your mood.',
    duration: 300, // 5 minutes
    category: 'physical',
    moodRecommended: ['sad', 'tired', 'stressed'],
    instructions: [
      'Stand tall with feet hip-width apart.',
      'Reach your arms high overhead and stretch your whole body upward.',
      'Take a deep breath in through your nose.',
      'As you exhale through your mouth, fold forward, letting your arms and upper body hang down.',
      'Let your head hang loose, feeling the stretch in your hamstrings and back.',
      'Slowly roll back up to standing, one vertebra at a time.',
      'Repeat 3-5 times, moving with your breath.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }
];

export function getRecommendedExercises(mood?: string, limit = 3): Exercise[] {
  if (!mood) {
    return exercises.slice(0, limit);
  }
  
  const recommended = exercises.filter(exercise => 
    exercise.moodRecommended.some(m => m === mood)
  );
  
  if (recommended.length === 0) {
    return exercises.slice(0, limit);
  }
  
  return recommended.slice(0, limit);
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(exercise => exercise.id === id);
}
