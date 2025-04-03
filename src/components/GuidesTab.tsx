
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { guides } from '@/data/guides';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GuidesTab: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter guides by category
  const getFilteredGuides = () => {
    if (activeTab === 'all') {
      return guides;
    } else {
      return guides.filter(guide => guide.category === activeTab);
    }
  };
  
  const filteredGuides = getFilteredGuides();
  
  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Get guide content
  const getGuideContent = () => {
    if (!activeGuide) return null;
    const guide = guides.find(g => g.id === activeGuide);
    if (!guide) return null;
    return guide;
  };
  
  const selectedGuide = getGuideContent();
  
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
              <CardTitle className="text-xl md:text-2xl">Wellness Guides</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        {selectedGuide ? (
          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex-row justify-between items-center">
                <CardTitle>{selectedGuide.title}</CardTitle>
                <Button variant="outline" onClick={() => setActiveGuide(null)}>
                  Back to Guides
                </Button>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {selectedGuide.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-2xl font-bold mb-4">{paragraph.substring(2)}</h1>;
                    } else if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-bold mb-3">{paragraph.substring(3)}</h2>;
                    } else if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-lg font-bold mb-2">{paragraph.substring(4)}</h3>;
                    } else if (paragraph.startsWith('- ')) {
                      return <li key={index} className="ml-6 mb-1">{paragraph.substring(2)}</li>;
                    } else if (paragraph.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="mb-4">{paragraph}</p>;
                    }
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-4 md:p-6">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="crisis">Crisis Help</TabsTrigger>
                    <TabsTrigger value="sleep">Sleep Tips</TabsTrigger>
                    <TabsTrigger value="study">Study Hacks</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredGuides.map(guide => (
                        <motion.div
                          key={guide.id}
                          className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                              {guide.content.split('\n')[0].replace('# ', '')}
                            </p>
                            <Button 
                              onClick={() => setActiveGuide(guide.id)}
                              variant="outline"
                              className="w-full"
                            >
                              Read Guide
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GuidesTab;
