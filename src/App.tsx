
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Layout from "@/components/Layout";
import MoodCheckIn from "@/components/MoodCheckIn";
import MoodInsights from "@/components/MoodInsights";
import Dashboard from "@/components/Dashboard";
import ExercisesTab from "@/components/ExercisesTab";
import ProgressTab from "@/components/ProgressTab";
import GuidesTab from "@/components/GuidesTab";
import ExercisePlayer from "@/components/ExercisePlayer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/check-in" replace />} />
            <Route path="/check-in" element={<MoodCheckIn />} />
            <Route path="/insights" element={<MoodInsights />} />
            <Route path="/exercise" element={<ExercisePlayer />} />
            <Route path="/home" element={<Layout><Dashboard /></Layout>} />
            <Route path="/exercises" element={<Layout><ExercisesTab /></Layout>} />
            <Route path="/progress" element={<Layout><ProgressTab /></Layout>} />
            <Route path="/guides" element={<Layout><GuidesTab /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
