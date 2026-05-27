import React from 'react';
import { VENUES } from '../mockData';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  TrendingUp, 
  MoveUpRight,
  MapPin,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const VenueInsights = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="space-y-1 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Venue Intelligence</h1>
        <p className="text-slate-400">Pitch DNA and conditional probability shifts per stadium.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {VENUES.map((venue, idx) => (
          <Card key={venue.id} className="overflow-hidden bg-black/40 border-white/5 rounded-[2rem] group">
            <div className="h-48 bg-slate-800 relative overflow-hidden">
               {/* Animated Background Placeholder */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
               <motion.div 
                 initial={{ opacity: 0.5, scale: 1 }}
                 animate={{ opacity: 0.2, scale: 1.2 }}
                 transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                 className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay" 
               />
               <div className="absolute bottom-6 left-8">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 rounded-lg bg-blue-500 text-white">
                     <MapPin size={16} />
                   </div>
                   <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white font-bold">
                     {venue.name.split(',')[1].trim()}
                   </Badge>
                 </div>
                 <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter shadow-sm">{venue.name.split(',')[0]}</h2>
               </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                 <MetricBox icon={<TrendingUp size={16} />} label="Avg 1st Score" value={venue.avgScore.toString()} />
                 <MetricBox icon={<Thermometer size={16} />} label="Pitch Temp" value="32°C" />
                 <MetricBox icon={<Wind size={16} />} label="Humid High" value="78%" />
                 <MetricBox icon={<CloudRain size={16} />} label="Rain Match Chance" value="2%" />
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span>Batting First Advantage</span>
                    <span className="text-blue-400">{venue.battingFirstWinPct}% Wins</span>
                  </div>
                  <Progress value={venue.battingFirstWinPct} className="h-2.5 bg-white/5" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span>Bowling First Advantage</span>
                    <span className="text-purple-400">{venue.bowlingFirstWinPct}% Wins</span>
                  </div>
                  <Progress value={venue.bowlingFirstWinPct} className="h-2.5 bg-white/5" />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <Info size={14} className="text-blue-500" /> Tactical Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase">Powerplay Pace</h5>
                    <p className="text-sm text-slate-500 italic">High bounce early on. Favor aggressive openers.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase">Mid-Innings Spin</h5>
                    <p className="text-sm text-slate-500 italic">Grip increases after 8th over. Economy drops significantly.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MetricBox = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="space-y-2">
    <div className="text-slate-500 flex items-center gap-2">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-2xl font-black text-white italic tracking-tighter">{value}</div>
  </div>
);

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] ${className}`}>
    {children}
  </span>
);

export default VenueInsights;
