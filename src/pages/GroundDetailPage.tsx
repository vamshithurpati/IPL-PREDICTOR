import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  MapPin, 
  Users, 
  Cloud, 
  Trophy, 
  TrendingUp, 
  Sparkles,
  Info,
  Maximize,
  Clock,
  Radar
} from 'lucide-react';
import { VENUES, TEAMS } from '../mockData';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const GroundDetailPage = () => {
  const { id } = useParams();
  const venue = VENUES.find(v => v.id === id);

  if (!venue) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h2 className="text-2xl font-bold">Venue not found</h2>
        <Button asChild className="mt-4">
          <Link to="/grounds">Back to Grounds</Link>
        </Button>
      </div>
    );
  }

  const scoreData = [
    { name: '1st Innings', score: venue.avgFirstInn },
    { name: '2nd Innings', score: venue.avgSecondInn },
    { name: 'High Chase', score: venue.highestChase }
  ];

  const tossData = [
    { name: 'Bat First', value: venue.batFirstWinProb },
    { name: 'Chasing', value: 100 - venue.batFirstWinProb }
  ];

  const COLORS = ['#3b82f6', '#1e293b'];

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col gap-8">
        <Button variant="ghost" asChild className="w-fit text-slate-400 hover:text-white -ml-4">
          <Link to="/grounds">
            <ChevronLeft size={18} className="mr-1" /> Back to All Grounds
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-3 py-1">
                {venue.city}, India
              </Badge>
              <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">
                {venue.name}
              </h1>
            </div>
            <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
              One of the most iconic venues in IPL history, known for its {venue.pitchType.toLowerCase()} pitch and incredible atmosphere.
            </p>
            <div className="flex flex-wrap gap-8 py-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Capacity</span>
                <span className="text-2xl font-black text-white italic">{venue.capacity?.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">IPL Matches</span>
                <span className="text-2xl font-black text-white italic">{venue.historicalMatchCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pitch Vibe</span>
                <span className="text-2xl font-black text-blue-500 italic">{venue.pitchType}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-video shadow-2xl shadow-blue-500/10"
          >
            <img 
              src={venue.imageUrl} 
              alt={venue.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-8 pt-8">
          {/* Scoring Patterns */}
          <Card className="lg:col-span-2 p-8 bg-white/[0.02] border-white/5 space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-500" /> Scoring Patterns
                </h3>
                <p className="text-xs text-slate-500">Historical average scores per innings</p>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold border-white/10 uppercase">Live Stats</Badge>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={60}>
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#a855f7' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">1st Innings</div>
                <div className="text-2xl font-black italic">{venue.avgFirstInn}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">2nd Innings</div>
                <div className="text-2xl font-black italic">{venue.avgSecondInn}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center border-purple-500/20">
                <div className="text-[10px] font-bold text-purple-400 uppercase mb-1">Highest Chase</div>
                <div className="text-2xl font-black italic text-purple-400">{venue.highestChase}</div>
              </div>
            </div>
          </Card>

          {/* Toss Impact */}
          <Card className="p-8 bg-white/[0.02] border-white/5 flex flex-col items-center text-center space-y-6">
            <div className="space-y-1 w-full text-left">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Radar size={18} className="text-indigo-400" /> Toss Impact
              </h3>
              <p className="text-xs text-slate-500">Influence of the coin flip</p>
            </div>
            
            <div className="relative h-[200px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tossData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {tossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black italic">{venue.batFirstWinProb}%</span>
                <span className="text-[8px] font-bold uppercase text-slate-500">Bat First Win</span>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-left">
                <h4 className="text-[10px] font-bold uppercase text-indigo-400 mb-1">Impact Analysis</h4>
                <p className="text-sm font-medium">{venue.tossImpact}</p>
              </div>
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs text-slate-400">Batting First</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <span className="text-xs text-slate-400">Chasing</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Pitch Report */}
        <Card className="p-8 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 border-white/5 rounded-[3rem]">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20">
              <Sparkles className="text-blue-400" size={32} />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Oracle Pitch Intelligence</h3>
                <Badge className="bg-blue-500 text-white font-bold text-[10px]">AI MODEL 3.0</Badge>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                "The {venue.pitchType} surface at {venue.name} provides {venue.pitchType === 'Spin-friendly' ? 'significant assistance to slow bowlers as the game progresses.' : 'true bounce and carry, making it a paradise for stroke-makers.'} Historical data shows that {venue.avgFirstInn > 180 ? 'a score above 190 is often required to defend effectively here.' : 'disciplined bowling early on can restrict the scoring significantly.'} Given the {venue.tossImpact.toLowerCase()}, teams winning the toss should strongly consider their decision based on {venue.historicalMatchCount > 50 ? 'extensive past performance' : 'recent climate trends'}."
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                  <Clock size={16} /> Last Scanned: Today, 14:05
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                  <Maximize size={16} /> Dimensions: 65m - 74m
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GroundDetailPage;
