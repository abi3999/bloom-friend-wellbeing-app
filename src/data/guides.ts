
import { Guide } from '@/types';

export const guides: Guide[] = [
  {
    id: '1',
    title: 'Crisis Help Guide',
    category: 'crisis',
    content: `
# Emergency Mental Health Resources

## If you're experiencing a mental health emergency:

### Immediate Help
- **National Suicide Prevention Lifeline**: 988 or 1-800-273-8255
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: Call 911 or go to your nearest emergency room

### Campus Resources
- **Campus Counseling Center**: Available 24/7 at 555-123-4567
- **Resident Advisor (RA)**: Your RA is trained to help in crisis situations
- **Campus Security**: 555-987-6543

## Warning Signs to Watch For
- Thoughts of suicide or self-harm
- Severe panic attacks
- Loss of touch with reality
- Inability to care for basic needs

## What to Expect When You Call
1. You'll speak with a trained counselor
2. They'll listen without judgment
3. They'll help determine next steps
4. Everything you share is confidential

Remember: Reaching out is a sign of strength, not weakness. Help is available and you deserve support.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Sleep Tips for Students',
    category: 'sleep',
    content: `
# Better Sleep for Better Learning

## Why Sleep Matters for Students
- Memory consolidation happens during sleep
- Emotional regulation requires adequate rest
- Academic performance directly correlates with sleep quality
- Immune function depends on consistent sleep

## Sleep Hygiene Basics

### Environment
- Keep your room cool (65-68°F/18-20°C)
- Use blackout curtains or an eye mask
- Try earplugs or white noise if needed
- Invest in a comfortable pillow

### Routine
- Go to bed and wake up at the same time daily (even weekends)
- Create a 30-minute wind-down ritual
- Avoid screens 1 hour before bed (blue light blocks melatonin)
- Limit caffeine after 2pm

### During the Day
- Get morning sunlight within 30 minutes of waking
- Exercise regularly (but not right before bed)
- Nap before 3pm and keep it under 30 minutes
- Manage stress through mindfulness or journaling

## When to Seek Help
If you've tried these tips for 2-3 weeks and still struggle with sleep, consider speaking with a healthcare provider. Sleep disorders are common and treatable.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Study Hacks That Actually Work',
    category: 'study',
    content: `
# Evidence-Based Study Techniques

## Effective Learning Methods

### Spaced Repetition
- **What**: Review material at increasing intervals
- **How**: Use flashcards with apps like Anki or Quizlet
- **Why**: Strengthens neural pathways more effectively than cramming

### Active Recall
- **What**: Test yourself instead of re-reading
- **How**: Close your notes and write down everything you remember
- **Why**: Forces your brain to retrieve information, strengthening memory

### The Pomodoro Technique
- **What**: 25 minutes of focused work, 5 minute break
- **How**: Use a timer and eliminate distractions during work periods
- **Why**: Matches your brain's natural attention cycle

## Environment Optimization

### Study Space
- Find 2-3 different locations to rotate between
- Keep your space clean and organized
- Have water and healthy snacks available
- Consider background noise that works for you (silence, nature sounds, or lo-fi beats)

### Digital Focus
- Turn off notifications during study sessions
- Use website blockers like Freedom or Cold Turkey
- Try the "airplane mode challenge" for 50 minutes
- Keep a "distractions notebook" to jot down off-topic thoughts

## When You're Stuck
- Change subjects and return later
- Explain the concept to an imaginary student
- Find a study partner for accountability
- Take a physical activity break (even 5 minutes helps)

Remember: The goal isn't to study longer—it's to study smarter.
    `,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f9?ixlib=rb-4.0.3'
  }
];

export function getGuideById(id: string): Guide | undefined {
  return guides.find(guide => guide.id === id);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter(guide => guide.category === category);
}
