import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { SetupProvider, useSetups } from "@/contexts/SetupContext";
import LocationPicker from "@/components/LocationPicker";
import { useLanguage } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Setups from "./pages/Setups";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { locationSet } = useLanguage();
  const { hasSetups } = useSetups();

  return (
    <>
      {!locationSet && <LocationPicker />}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={hasSetups ? <Navigate to="/dashboard" replace /> : <Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setups" element={<Setups />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <SetupProvider>
          <AppContent />
        </SetupProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
