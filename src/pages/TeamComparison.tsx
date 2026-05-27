import React, { useState } from 'react';
import { TEAMS, MATCHES } from '../mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Users, Sword } from 'lucide-react';

const TeamComparison = () => {
  const [team1Id, setTeam1Id] = useState<string>('csk');
  const [team2Id, setTeam2Id] = useState<string>('mi');

  const team1 = TEAMS.find(t => t.id === team1Id)!;
  const team2 = TEAMS.find(t => t.id === team2Id)!;

  const comparisonData = [
    { subject: 'Batting Power', A: team1Id === 'rcb' || team1Id === 'mi' ? 95 : 82, B: team2Id === 'rcb' || team2Id === 'mi' ? 95 : 82, fullMark: 100 },
    { subject: 'Bowling Variant', A: team1Id === 'gt' || team1Id === 'srh' ? 90 : 75, B: team2Id === 'gt' || team2Id === 'srh' ? 90 : 75, fullMark: 100 },
    { subject: 'Fielding', A: team1Id === 'csk' || team1Id === 'gt' ? 92 : 80, B: team2Id === 'csk' || team2Id === 'gt' ? 92 : 80, fullMark: 100 },
    { subject: 'Death Overs', A: team1Id === 'mi' || team1Id === 'csk' ? 94 : 70, B: team2Id === 'mi' || team2Id === 'csk' ? 94 : 70, fullMark: 100 },
    { subject: 'Spin Control', A: team1Id === 'kkr' || team1Id === 'csk' ? 96 : 78, B: team2Id === 'kkr' || team2Id === 'csk' ? 96 : 78, fullMark: 100 },
    { subject: 'Experience', A: team1Id === 'csk' || team1Id === 'mi' ? 98 : 80, B: team2Id === 'csk' || team2Id === 'mi' ? 98 : 80, fullMark: 100 },
  ];

  const recentPerformance = [
    { name: 'Last 1', [team1.shortName]: 1, [team2.shortName]: 1 },
    { name: 'Last 2', [team1.shortName]: 0, [team2.shortName]: 1 },
    { name: 'Last 3', [team1.shortName]: 1, [team2.shortName]: 0 },
    { name: 'Last 4', [team1.shortName]: 1, [team2.shortName]: 1 },
    { name: 'Last 5', [team1.shortName]: 0, [team2.shortName]: 0 },
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">H2H Comparison</h1>
          <p className="text-slate-400">Deep dive into team strengths and historical dominance.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
          <Select value={team1Id} onValueChange={setTeam1Id}>
            <SelectTrigger className="w-[180px] bg-transparent border-0 ring-0 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="text-xs font-bold text-slate-600 italic">VS</div>
          <Select value={team2Id} onValueChange={setTeam2Id}>
            <SelectTrigger className="w-[180px] bg-transparent border-0 ring-0 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Radar Chart */}
        <Card className="lg:col-span-1 p-8 bg-black/40 border-white/5 rounded-[2rem] flex flex-col items-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8 self-start flex items-center gap-2">
            <Sword size={16} className="text-red-500" /> Attributes Breakdown
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={comparisonData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                <Radar
                  name={team1.shortName}
                  dataKey="A"
                  stroke={team1.primaryColor}
                  fill={team1.primaryColor}
                  fillOpacity={0.3}
                />
                <Radar
                  name={team2.shortName}
                  dataKey="B"
                  stroke={team2.primaryColor}
                  fill={team2.primaryColor}
                  fillOpacity={0.3}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ fontSize: 12 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: team1.primaryColor }} />
              <span className="text-slate-400">{team1.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: team2.primaryColor }} />
              <span className="text-slate-400">{team2.name}</span>
            </div>
          </div>
        </Card>

        {/* Win Momentum */}
        <Card className="lg:col-span-2 p-8 bg-black/40 border-white/5 rounded-[2rem]">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" /> Form Momentum (Last 5)
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                />
                <Bar dataKey={team1.shortName} fill={team1.primaryColor} radius={[4, 4, 0, 0]} />
                <Bar dataKey={team2.shortName} fill={team2.primaryColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Total Titles</div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-white italic">{team1.id === 'csk' || team1.id === 'mi' ? '5' : '1'}</div>
                <div className="text-slate-700">vs</div>
                <div className="text-3xl font-black text-white italic">{team2.id === 'mi' || team2.id === 'csk' ? '5' : '0'}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">H2H Wins</div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-white italic">16</div>
                <div className="text-slate-700">vs</div>
                <div className="text-3xl font-black text-white italic">20</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Avg Score</div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-white italic">172</div>
                <div className="text-slate-700">vs</div>
                <div className="text-3xl font-black text-white italic">175</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Users size={20} className="text-blue-500" /> Key Matchups to Watch
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MatchupCard 
            title="Kohli vs Bumrah" 
            metric="Battle of Giants" 
            description="High intensity duel at the start of the innings. Bumrah has dismissed Kohli 5 times in IPL."
          />
          <MatchupCard 
            title="Dhoni at Death" 
            metric="Last 5 Overs" 
            description="Strike rate jumps to 192.4 when facing pace in the final 3 overs at Wankhede."
          />
          <MatchupCard 
            title="Rashid vs Spin" 
            metric="Economy Control" 
            description="Lowest economy at this venue among all current active spinners (6.2 rpo)."
          />
        </div>
      </div>
    </div>
  );
};

const MatchupCard = ({ title, metric, description }: { title: string, metric: string, description: string }) => (
  <Card className="p-6 bg-white/[0.02] border-white/5 hover:bg-white/[0.05] transition-all group">
    <Badge className="mb-4 bg-blue-500/10 text-blue-400 hover:bg-blue-500/10 border-blue-500/20 rounded-lg">
      {metric}
    </Badge>
    <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight italic">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </Card>
);

export default TeamComparison;
