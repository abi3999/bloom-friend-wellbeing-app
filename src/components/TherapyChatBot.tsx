
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { generateBotResponse } from '@/utils/aiUtils';
import { motion } from 'framer-motion';
import { SendIcon } from 'lucide-react';
import { ChatMessage } from '@/types';

const TherapyChatBot: React.FC = () => {
  const { chatMessages, addChatMessage, currentMood } = useApp();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  // Generate greeting if no messages
  useEffect(() => {
    if (chatMessages.length === 0) {
      const greeting: ChatMessage = {
        id: Date.now().toString(),
        text: "Hi there! I'm Bloom, your wellness companion. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      addChatMessage(greeting);
    }
  }, [chatMessages, addChatMessage]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addChatMessage(userMessage);
    
    // Clear input
    setMessage('');
    
    // Generate bot response
    setTimeout(() => {
      const response = generateBotResponse(message, currentMood);
      addChatMessage(response);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 border'
              }`}
            >
              <p>{msg.text}</p>
              <div 
                className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 bg-white border-t">
        <div className="flex">
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 mr-2"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()} className="hover-scale">
            <SendIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapyChatBot;
