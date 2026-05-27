import React from 'react';
import { PLAYERS, TEAMS } from '../mockData';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, Zap, Target } from 'lucide-react';
import { Input } from "@/components/ui/input";

const PlayerAnalytics = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Player Intelligence</h1>
          <p className="text-slate-400">Individual performance metrics and scouting reports.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-96">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl" placeholder="Search players..." />
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLAYERS.map(player => {
          const team = TEAMS.find(t => t.id === player.teamId);
          return (
            <Card key={player.id} className="overflow-hidden bg-black/40 border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="h-2 w-full" style={{ backgroundColor: team?.primaryColor }} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors uppercase italic">{player.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{team?.name}</span>
                      <div className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{player.role}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black italic text-slate-700 text-xl border border-white/10">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Runs</div>
                    <div className="text-xl font-black tabular-nums">{player.runs.toLocaleString()}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Strike Rate</div>
                    <div className="text-xl font-black tabular-nums text-blue-400">{player.strikeRate}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Wickets</div>
                    <div className="text-xl font-black tabular-nums">{player.wickets}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Avg</div>
                    <div className="text-xl font-black tabular-nums">{player.battingAvg}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Key Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-0 flex items-center gap-1">
                      <TrendingUp size={10} /> Death Over Specialist
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-0 flex items-center gap-1">
                      <Zap size={10} /> Powerhitter
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-0 flex items-center gap-1">
                      <Target size={10} /> Lead Spinner
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerAnalytics;
