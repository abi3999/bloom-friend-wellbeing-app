
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Cpu, BarChart, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasCompletedOnboarding } = useApp();
  
  // If user hasn't completed onboarding and tries to access protected routes, redirect to check-in
  const isProtectedRoute = !['/check-in', '/insights', '/', '/exercise'].includes(location.pathname);
  
  if (isProtectedRoute && !hasCompletedOnboarding) {
    navigate('/');
    return null;
  }
  
  // Don't show nav on check-in, insights, and exercise pages
  const showNav = !['/check-in', '/insights', '/exercise', '/'].includes(location.pathname);
  
  if (!showNav) {
    return <>{children}</>;
  }
  
  const navItems = [
    { path: '/home', icon: <Home size={20} />, label: 'Home' },
    { path: '/exercises', icon: <Cpu size={20} />, label: 'Exercises' },
    { path: '/progress', icon: <BarChart size={20} />, label: 'Progress' },
    { path: '/guides', icon: <BookOpen size={20} />, label: 'Guides' }
  ];
  
  const getCurrentPath = () => {
    return location.pathname;
  };
  
  const currentPath = getCurrentPath();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        {children}
      </main>
      
      {/* Crisis Help Button */}
      <motion.div 
        className="fixed top-4 right-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          onClick={() => navigate('/guides')}
          className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          aria-label="Crisis Help"
        >
          <AlertTriangle size={16} />
        </button>
      </motion.div>
      
      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-around items-center h-16">
          {navItems.map(item => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-1/4 py-1 ${
                currentPath === item.path ? 'text-blue-500' : 'text-gray-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="mb-1">
                {item.icon}
              </div>
              <span className="text-xs">{item.label}</span>
              {currentPath === item.path && (
                <motion.div
                  className="absolute bottom-0 w-1/4 h-0.5 bg-blue-500"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>
      
      {/* Add padding to account for fixed bottom nav */}
      <div className="h-16"></div>
    </div>
  );
};

export default Layout;
