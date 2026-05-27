import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Zap, Shield, ChevronRight, BarChart3, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Zap size={14} className="animate-pulse" />
          AI Match Predictions are Live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl"
        >
          Predict the Game <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent italic">
            Before It Begins.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          AI-powered IPL match analytics based on 15 years of statistics, player form, 
          and venue intelligence. Get the edge in your fantasy leagues.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 h-14 text-base shadow-2xl shadow-blue-600/30">
              Predict Now <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/comparison">
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl px-8 h-14 text-base backdrop-blur-sm">
              Explore Analytics
            </Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-24 py-8 border-y border-white/5"
        >
          <StatItem label="Matches Analyzed" value="1,240+" />
          <StatItem label="Prediction Accuracy" value="84.2%" />
          <StatItem label="Active Users" value="12k+" />
          <StatItem label="Teams Tracked" value="10" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Unmatched Intelligence</h2>
          <p className="text-slate-400">Our engine looks deeper than just historical wins.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<TrendingUp className="text-blue-500" />}
            title="Form Momentum"
            description="Analyzes the last 5 matches' performance metrics for every player and team."
          />
          <FeatureCard 
            icon={<MapPin className="text-purple-500" />}
            title="Venue DNA"
            description="Understands pitch behavior, weather impact, and boundary size advantages."
          />
          <FeatureCard 
            icon={<Shield className="text-indigo-500" />}
            title="Toss Impact"
            description="Calculates probability shifts dynamic to the toss outcome and match timing."
          />
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-[2rem] border border-white/5 p-4 lg:p-12 shadow-3xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-blue-400" />
              </div>
              <h3 className="text-4xl font-bold tracking-tight">AI Explanations, <br />Not Just Numbers.</h3>
              <p className="text-slate-400 leading-relaxed">
                Most platforms give you a probability. We give you a reasoning. 
                Our AI explains the tactical advantages, key matchups to watch, 
                and the "X-Factors" for each game.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Head-to-head historical breakdown
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Death-over strike rate sensitivity
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Spin vs Pace conditions analysis
                </li>
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="aspect-video bg-slate-800/50 rounded-2xl border border-white/10 backdrop-blur-sm p-4 flex flex-col items-center justify-center text-slate-500 overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-[#111] rounded-xl flex flex-col overflow-hidden">
                  <div className="h-8 border-b border-white/5 flex items-center px-4 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-32 bg-white/5 rounded" />
                      <div className="h-4 w-12 bg-blue-500/20 rounded" />
                    </div>
                    <div className="h-24 w-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-white/5" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-white/5 rounded" />
                      <div className="h-3 w-[80%] bg-white/5 rounded" />
                      <div className="h-3 w-[60%] bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-1">
    <div className="text-3xl font-bold text-white tabular-nums tracking-tight">{value}</div>
    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
