
import { MoodSelection, ChatMessage } from '@/types';

// Simple AI response generator based on mood
export const generateMoodInsights = (moodSelection: MoodSelection): string[] => {
  const { emoji, color } = moodSelection;
  
  const insights: Record<string, string[]> = {
    // Happy insights
    'happy-stress': [
      "Feeling energetic but a bit overwhelmed?",
      "Your positive energy might be masking some pressure.",
      "Finding balance between excitement and rest is key today."
    ],
    'happy-calm': [
      "You're in a peaceful, content state of mind.",
      "This is a great time for creative pursuits.",
      "Your balanced mood could help others around you."
    ],
    'happy-energy': [
      "You're radiating positive energy!",
      "Great day to tackle that project you've been putting off.",
      "Share your enthusiasm with someone who needs it."
    ],
    'happy-balance': [
      "You've found that sweet spot of contentment and purpose.",
      "This balanced happy state is perfect for meaningful connections.",
      "Consider journaling today to capture this feeling."
    ],
    'happy-drain': [
      "Feeling happy but perhaps a bit tired?",
      "Your positive outlook might need some physical rest to sustain.",
      "Take it easy while enjoying this good mood."
    ],
    
    // Sad insights
    'sad-stress': [
      "Feeling down and pressured at the same time?",
      "It's okay to take a step back from responsibilities right now.",
      "Small self-care acts can help shift this heavy feeling."
    ],
    'sad-calm': [
      "There's a quietness to your sadness today.",
      "This reflective mood might be showing you what needs attention.",
      "Gentle activities like walking or journaling could feel supportive."
    ],
    'sad-energy': [
      "Your sadness has an active quality to it today.",
      "Physical movement might help process these emotions.",
      "This restless feeling might be your mind seeking solutions."
    ],
    'sad-balance': [
      "You're holding your sadness with awareness.",
      "This balanced approach to difficult emotions is healthy.",
      "Remember it's okay to feel sad without trying to fix it immediately."
    ],
    'sad-drain': [
      "Feeling emotionally and physically depleted?",
      "This heavy sadness might be asking you to rest completely.",
      "Reach out for support—you don't have to carry this alone."
    ],
    
    // Angry insights
    'angry-stress': [
      "Your anger might be a response to feeling overwhelmed.",
      "There's likely a boundary that needs setting.",
      "Quick physical release like jumping jacks could help diffuse this tension."
    ],
    'angry-calm': [
      "You're experiencing controlled frustration.",
      "This measured anger might be pointing to something important.",
      "You have the clarity to address issues without being reactive."
    ],
    'angry-energy': [
      "Your anger has a lot of energy behind it.",
      "Channeling this into physical activity could be helpful.",
      "This powerful emotion can motivate positive changes when directed well."
    ],
    'angry-balance': [
      "You're acknowledging your anger without being consumed by it.",
      "This balanced approach helps you see multiple perspectives.",
      "You can use this energy constructively to advocate for yourself."
    ],
    'angry-drain': [
      "Your anger might be masking exhaustion.",
      "This frustrated-tired feeling often comes after sustained stress.",
      "Rest might actually address this better than solutions right now."
    ],
    
    // Tired insights
    'tired-stress': [
      "You're pushing through fatigue with anxiety.",
      "Your body might be sending signals to slow down.",
      "Even a 10-minute genuine break can help reset your system."
    ],
    'tired-calm': [
      "You're tired but not fighting it.",
      "This acceptance of your needs is healthy.",
      "Gentle self-care rather than pushing through might be best now."
    ],
    'tired-energy': [
      "You're experiencing that 'wired but tired' feeling.",
      "Your body is fatigued but your mind is still active.",
      "Calming activities might help these systems sync up again."
    ],
    'tired-balance': [
      "You're balancing awareness of your tiredness with responsibilities.",
      "This mindful approach to fatigue helps you prioritize effectively.",
      "Respecting your limitations now prevents bigger crashes later."
    ],
    'tired-drain': [
      "You're experiencing deep fatigue at multiple levels.",
      "This is your system asking for significant rest.",
      "Simplifying your commitments might be necessary right now."
    ],
    
    // Neutral insights
    'neutral-stress': [
      "Feeling neither good nor bad, but there's tension present.",
      "This emotional neutrality might be your mind's way of managing stress.",
      "Notice if you're disconnecting from feelings as a coping mechanism."
    ],
    'neutral-calm': [
      "You're in a place of emotional stillness.",
      "This neutral, calm state can be excellent for clear thinking.",
      "A good time for decisions that require objectivity."
    ],
    'neutral-energy': [
      "You're emotionally centered but physically energized.",
      "This balanced state is excellent for productive work.",
      "Your emotional neutrality gives you flexibility today."
    ],
    'neutral-balance': [
      "You're experiencing a grounded, steady emotional state.",
      "This balanced neutrality helps you stay adaptable.",
      "A good time for routines and habits that support your wellbeing."
    ],
    'neutral-drain': [
      "Your neutral mood might be coming from emotional or physical depletion.",
      "Sometimes feeling 'nothing' is actually numbness from overwhelm.",
      "Gentle reconnection with simple pleasures might help."
    ],
    
    // Hopeful insights
    'hopeful-stress': [
      "You're optimistic but also feeling pressure.",
      "This mix of hope and stress often comes during transitions.",
      "Finding small wins can help maintain your positive outlook."
    ],
    'hopeful-calm': [
      "Your hopeful outlook has a peaceful quality.",
      "This gentle optimism helps you see possibilities without anxiety.",
      "A wonderful state for planning and dreaming."
    ],
    'hopeful-energy': [
      "Your hope is energizing you!",
      "This enthusiastic optimism can be contagious in a good way.",
      "A great time to inspire others or start something new."
    ],
    'hopeful-balance': [
      "You've found a grounded, realistic hope.",
      "This balanced optimism sees both challenges and possibilities.",
      "Your perspective helps you move forward while staying flexible."
    ],
    'hopeful-drain': [
      "You're maintaining hope despite feeling tired.",
      "This resilience is meaningful—you're seeing light despite challenges.",
      "Supporting this hope with rest will help it flourish."
    ]
  };

  const key = `${emoji}-${color}`;
  return insights[key] || [
    "How are you feeling right now?",
    "Take a moment to check in with yourself.",
    "What might you need at this moment?"
  ];
};

// Simple AI chatbot responses
export const generateBotResponse = (userMessage: string, currentMood?: MoodSelection): ChatMessage => {
  const lowercaseMessage = userMessage.toLowerCase();
  let response = '';

  // Basic keyword matching for responses
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
    response = "Hi there! I'm Bloom, your mental wellbeing companion. How can I support you today?";
  } 
  else if (lowercaseMessage.includes('sad') || lowercaseMessage.includes('depressed') || lowercaseMessage.includes('unhappy')) {
    response = "I'm sorry to hear you're feeling down. Remember that it's okay to feel sad sometimes. Would you like to try a mood-lifting exercise, or would you prefer to talk more about what's on your mind?";
  }
  else if (lowercaseMessage.includes('anxious') || lowercaseMessage.includes('stress') || lowercaseMessage.includes('worried')) {
    response = "Feeling anxious is really challenging. Have you tried any breathing exercises today? The 4-7-8 breathing technique can be helpful when anxiety hits. Would you like me to guide you through it?";
  }
  else if (lowercaseMessage.includes('tired') || lowercaseMessage.includes('exhausted') || lowercaseMessage.includes('no energy')) {
    response = "Being tired can affect everything. Are you getting enough rest? Sometimes a short 20-minute power nap can help restore your energy. Would you like to try our guided power nap?";
  }
  else if (lowercaseMessage.includes('angry') || lowercaseMessage.includes('mad') || lowercaseMessage.includes('frustrated')) {
    response = "It sounds like you're feeling frustrated. That's a normal emotion! Sometimes expressing it through creative outlets like our Angry Doodle Pad can help process these feelings. Would you like to try that?";
  }
  else if (lowercaseMessage.includes('help') || lowercaseMessage.includes('need support')) {
    response = "I'm here to support you. Would you like to explore some coping strategies, try a breathing exercise, or just chat about what's on your mind?";
  }
  else if (lowercaseMessage.includes('exercise') || lowercaseMessage.includes('activity') || lowercaseMessage.includes('practice')) {
    response = "We have several exercises that might help you feel better, like breathing techniques, mindfulness practices, and quick physical activities. What kind would be most helpful right now?";
  }
  else if (lowercaseMessage.includes('thank') || lowercaseMessage.includes('thanks')) {
    response = "You're very welcome! I'm always here when you need support. Is there anything else I can help with today?";
  }
  else if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
    response = "Take care! Remember that I'm here whenever you need to chat. Have a peaceful day!";
  }
  else if (lowercaseMessage.includes('yes')) {
    response = "Great! I'm here to help. What would you like to explore first?";
  }
  else if (lowercaseMessage.includes('no')) {
    response = "That's completely okay. We can try something else or just chat if you prefer. What would feel supportive right now?";
  }
  else {
    // Default responses if no keywords match
    const defaultResponses = [
      "I'm here to listen. Could you tell me more about what's on your mind?",
      "Thank you for sharing. How else can I support you today?",
      "I appreciate you reaching out. Would you like to explore some supportive exercises?",
      "I'm here for you. What would be most helpful right now?",
      "Your wellbeing matters. How can I help you take care of yourself today?"
    ];
    
    // Choose a random default response
    response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  return {
    id: Date.now().toString(),
    text: response,
    sender: 'bot',
    timestamp: new Date().toISOString()
  };
};
