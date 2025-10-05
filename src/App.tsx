import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import Timetable from "./pages/Timetable";
import Services from "./pages/Services";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import CabSharing from "./pages/CabSharing";
import Complaints from "./pages/Complaints";
import Elections from "./pages/Elections";
import GateLogs from "./pages/GateLogs";
import LostFound from "./pages/LostFound";
import QuickLinks from "./pages/QuickLinks";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const noNavPaths = ["/", "/login", "/verify-otp"];
  const showBottomNav = !noNavPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/services" element={<Services />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cab-sharing" element={<CabSharing />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/gate-logs" element={<GateLogs />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/quick-links" element={<QuickLinks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showBottomNav && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
