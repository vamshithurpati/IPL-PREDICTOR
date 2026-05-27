import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TEAMS, PLAYERS } from '../mockData';
import { Sparkles, Users, Crown, Zap, Shield, TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const FantasyGenerator = () => {
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lineup, setLineup] = useState<any>(null);

  const generateLineup = () => {
    if (!team1 || !team2) return;
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      const allPlayers = [...PLAYERS.filter(p => p.teamId === team1), ...PLAYERS.filter(p => p.teamId === team2)];
      const sorted = [...allPlayers].sort(() => Math.random() - 0.5);
      
      setLineup({
        captain: sorted[0],
        viceCaptain: sorted[1],
        batsmen: sorted.slice(2, 5),
        bowlers: sorted.slice(5, 8),
        allrounders: sorted.slice(8, 10),
        wk: sorted[10] || sorted[0]
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Fantasy Squad Engine</h1>
          <p className="text-slate-400">Optimize your lineup with AI-picked captains and differential picks.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/10">
          <Select value={team1} onValueChange={setTeam1}>
            <SelectTrigger className="w-[140px] bg-transparent border-0 ring-0 focus:ring-0">
              <SelectValue placeholder="Team A" />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map(t => <SelectItem key={t.id} value={t.id}>{t.shortName}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="text-[10px] font-bold text-slate-700 italic">VS</div>
          <Select value={team2} onValueChange={setTeam2}>
            <SelectTrigger className="w-[140px] bg-transparent border-0 ring-0 focus:ring-0">
              <SelectValue placeholder="Team B" />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map(t => <SelectItem key={t.id} value={t.id}>{t.shortName}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button 
            disabled={!team1 || !team2 || isGenerating}
            onClick={generateLineup}
            className="bg-blue-600 hover:bg-blue-500 rounded-xl"
          >
            {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
          </Button>
        </div>
      </div>

      {!lineup && !isGenerating && (
        <div className="h-96 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-slate-500 p-12 text-center bg-white/[0.01]">
          <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Build Your Winning XI</h3>
          <p className="max-w-xs text-sm">Select any match-up to generate an AI-optimized fantasy team based on player form and venue conditions.</p>
        </div>
      )}

      {isGenerating && (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">Scanning player stats & form momentum...</p>
        </div>
      )}

      {lineup && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main Lineup */}
          <Card className="lg:col-span-2 p-8 bg-black/40 border-white/5 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent" />
            
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Shield size={14} className="text-blue-500" /> Optimal Starting XI
              </h3>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">9.5/10 Confidence</Badge>
            </div>

            <div className="space-y-12">
               <SquadGroup title="Captains" players={[lineup.captain, lineup.viceCaptain]} isCaptain />
               <SquadGroup title="Batsmen" players={lineup.batsmen} />
               <SquadGroup title="All-Rounders" players={lineup.allrounders} />
               <SquadGroup title="Bowlers" players={lineup.bowlers} />
            </div>
          </Card>

          {/* Tactical Hub */}
          <div className="space-y-6">
             <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 border-0 rounded-[2rem] text-white shadow-2xl shadow-blue-600/20">
                <Crown className="w-10 h-10 mb-6 opacity-50" />
                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Captain's Pick</h4>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {lineup.captain.name} has a strike rate of 165.2 in the powerplay at this venue. 
                  Expected to maximize points against the new ball.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-black italic border border-white/20">
                    2x
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest">Points Potential</div>
                </div>
             </Card>

             <Card className="p-8 bg-black/40 border-white/5 rounded-[2rem] space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-500" /> Differential Picks
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lineup.bowlers[0]?.name}</span>
                    <Badge variant="outline" className="text-[10px] border-white/10 text-slate-500">8% Owned</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{lineup.allrounders[0]?.name}</span>
                    <Badge variant="outline" className="text-[10px] border-white/10 text-slate-500">12% Owned</Badge>
                  </div>
                </div>
             </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SquadGroup = ({ title, players, isCaptain }: { title: string, players: any[], isCaptain?: boolean }) => (
  <div className="space-y-4">
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{title}</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {players.map((p, i) => (
        <div key={p.id} className="relative group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col items-center">
          <div className="w-10 h-10 bg-slate-800 rounded-lg mb-3 flex items-center justify-center text-xs font-black text-slate-600">
             {p.name.split(' ').map((n:any) => n[0]).join('')}
          </div>
          <span className="text-xs font-bold text-center uppercase tracking-tighter truncate w-full">{p.name}</span>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">
             {TEAMS.find(t => t.id === p.teamId)?.shortName}
          </span>
          {isCaptain && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center text-[10px] font-black italic shadow-lg border-2 border-[#111]">
              {i === 0 ? 'C' : 'VC'}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default FantasyGenerator;
