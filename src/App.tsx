import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  MapPin, 
  PieChart, 
  Info,
  TrendingUp,
  Github,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/sonner";
import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { toast } from 'sonner';

// Pages
import LandingPage from './pages/LandingPage';
import PredictionDashboard from './pages/PredictionDashboard';
import TeamComparison from './pages/TeamComparison';
import PlayerAnalytics from './pages/PlayerAnalytics';
import GroundsPage from './pages/GroundsPage';
import GroundDetailPage from './pages/GroundDetailPage';
import FantasyGenerator from './pages/FantasyGenerator';
import PointsTable from './pages/PointsTable';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error("Failed to sign in.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out.");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Sidebar / Topnav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 h-16 flex items-center px-6 justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Trophy className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            IPL Oracle AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/dashboard" active={isActive('/dashboard')} icon={<LayoutDashboard size={18} />} label="Predict" />
          <NavLink to="/comparison" active={isActive('/comparison')} icon={<PieChart size={18} />} label="Compare" />
          <NavLink to="/players" active={isActive('/players')} icon={<Users size={18} />} label="Players" />
          <NavLink to="/venues" active={isActive('/venues')} icon={<MapPin size={18} />} label="Grounds" />
          <NavLink to="/fantasy" active={isActive('/fantasy')} icon={<TrendingUp size={18} />} label="Fantasy" />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
            <Info size={20} />
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <UserIcon size={14} className="text-slate-400" />
                </div>
              )}
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Connect
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/40 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Trophy className="text-blue-500 w-5 h-5" />
              <span className="font-bold text-lg">IPL Oracle AI</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Next-generation match predictions using deep learning and real-time historical data.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/table" className="hover:text-white transition-colors">Points Table</Link>
            {user?.email === 'vedasrikavya316@gmail.com' && (
              <Link to="/admin" className="hover:text-blue-400 transition-colors font-bold">Admin</Link>
            )}
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              <Github size={14} /> Github
            </a>
          </div>
          
          <div className="text-slate-600 text-xs">
            © 2026 IPL Oracle AI. All rights reserved. Not affiliated with BCCI/IPL.
          </div>
        </div>
      </footer>
      <Toaster position="top-right" theme="dark" />
    </div>
  );
};

const NavLink = ({ to, active, icon, label }: { to: string, active: boolean, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-blue-500/10 text-blue-400' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<PredictionDashboard />} />
          <Route path="/comparison" element={<TeamComparison />} />
          <Route path="/players" element={<PlayerAnalytics />} />
          <Route path="/venues" element={<GroundsPage />} />
          <Route path="/grounds/:id" element={<GroundDetailPage />} />
          <Route path="/fantasy" element={<FantasyGenerator />} />
          <Route path="/table" element={<PointsTable />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
