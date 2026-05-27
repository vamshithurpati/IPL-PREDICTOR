import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dna, 
  Sparkles, 
  ChevronRight, 
  Trophy, 
  Info,
  Calendar,
  MapPin,
  Dice5,
  Loader2,
  History,
  User
} from 'lucide-react';
import { TEAMS, VENUES, PLAYERS } from '../mockData';
import { generatePrediction } from '../services/aiService';
import { predictionService } from '../services/predictionService';
import { dataService } from '../services/dataService';
import { Team, VenueStats, Player, Prediction } from '../types';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const PredictionDashboard = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [teams, setTeams] = useState<Team[]>(TEAMS);
  const [venues, setVenues] = useState<VenueStats[]>(VENUES);
  const [players, setPlayers] = useState<Player[]>(PLAYERS);
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [venueId, setVenueId] = useState<string>(VENUES[0].id);
  const [tossWinner, setTossWinner] = useState<string | 'none'>('none');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [history, setHistory] = useState<Prediction[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const [t, v, p] = await Promise.all([
        dataService.getTeams(),
        dataService.getVenues(),
        dataService.getPlayers()
      ]);
      setTeams(t);
      setVenues(v);
      setPlayers(p);
      if (v.length > 0) setVenueId(v[0].id);
    };
    loadInitialData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        loadHistory();
      }
    });
    return () => unsubscribe();
  }, []);

  const loadHistory = async () => {
    const userHistory = await predictionService.getUserPredictions();
    setHistory(userHistory);
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Successfully connected!");
    } catch (error) {
      toast.error("Failed to connect with Google.");
    }
  };

  const handleGenerate = async () => {
    if (!team1 || !team2) {
      toast.error("Please select both teams");
      return;
    }
    if (team1 === team2) {
      toast.error("Please select different teams");
      return;
    }

    setIsGenerating(true);
    setPrediction(null);

    try {
      const t1 = teams.find(t => t.id === team1)!;
      const t2 = teams.find(t => t.id === team2)!;
      const v = venues.find(v => v.id === venueId)!;
      const p1 = players.filter(p => p.teamId === team1);
      const p2 = players.filter(p => p.teamId === team2);

      const result = await generatePrediction(t1, t2, p1, p2, v, tossWinner === 'none' ? undefined : tossWinner);
      setPrediction(result);
      
      if (user) {
        await predictionService.savePrediction({
          matchId: 'custom',
          predictedWinnerId: result.winnerId,
          winProbability: result.probabilities,
          confidence: result.confidence,
          aiExplanation: result.explanation,
          userId: user.uid
        });
        loadHistory();
      }

      toast.success("Prediction generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate prediction. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getTeam = (id: string) => teams.find(t => t.id === id);

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Match Prediction Engine</h1>
            <p className="text-slate-400">Configure the match conditions to generate an AI-powered outcome probability.</p>
          </div>
          {user && (
            <Button 
              variant="outline" 
              onClick={() => setShowHistory(!showHistory)}
              className="border-white/10 hover:bg-white/5"
            >
              <History size={18} className="mr-2" />
              {showHistory ? "Back to Engine" : "View History"}
            </Button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showHistory && user ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-4"
            >
              {history.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-slate-500">No prediction history found.</p>
                </div>
              ) : (
                history.map((h) => (
                  <Card key={h.id} className="p-6 bg-white/[0.02] border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-bold text-blue-400">{getTeam(h.predictedWinnerId)?.shortName} Win</div>
                      <div className="h-4 w-px bg-white/10" />
                      <div className="text-xs text-slate-500">Confidence: {h.confidence}%</div>
                    </div>
                    <div className="text-xs text-slate-500 italic max-w-md truncate">
                      {h.aiExplanation}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => {
                        setPrediction({
                          winnerId: h.predictedWinnerId,
                          probabilities: h.winProbability,
                          confidence: h.confidence,
                          explanation: h.aiExplanation
                        });
                        setShowHistory(false);
                    }}>
                      Re-load
                    </Button>
                  </Card>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="engine"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Controls */}
              <div className="lg:col-span-1 space-y-6">
                {!user && (
                    <Card className="p-6 bg-blue-500/10 border-blue-500/20 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <User className="text-white" size={20} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold">Sign in to save predictions</h4>
                                <p className="text-xs text-slate-400 mb-3">Connect your account to keep track of your prediction history.</p>
                                <Button size="sm" onClick={handleLogin} className="w-full">Sign In with Google</Button>
                            </div>
                        </div>
                    </Card>
                )}
                <Card className="p-6 bg-white/[0.02] border-white/5 space-y-6">
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Trophy size={14} className="text-blue-500" /> Match Selection
                    </label>
                    <div className="space-y-3">
                      <Select value={team1} onValueChange={setTeam1}>
                        <SelectTrigger className="bg-black/20 border-white/10 h-12">
                          <SelectValue placeholder="Select Team A" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map(team => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center justify-center -my-1">
                        <span className="text-[10px] font-bold text-slate-600 bg-white/5 px-2 py-0.5 rounded italic">VS</span>
                      </div>
                      <Select value={team2} onValueChange={setTeam2}>
                        <SelectTrigger className="bg-black/20 border-white/10 h-12">
                          <SelectValue placeholder="Select Team B" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map(team => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <MapPin size={14} className="text-purple-500" /> Venue & Conditions
                    </label>
                    <Select value={venueId} onValueChange={setVenueId}>
                      <SelectTrigger className="bg-black/20 border-white/10 h-12">
                        <SelectValue placeholder="Select Venue" />
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map(venue => (
                          <SelectItem key={venue.id} value={venue.id}>{venue.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Dice5 size={14} className="text-yellow-500" /> Toss Advantage
                    </label>
                    <Select value={tossWinner} onValueChange={setTossWinner}>
                      <SelectTrigger className="bg-black/20 border-white/10 h-12">
                        <SelectValue placeholder="Toss Outcome (Optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Undecided / Not specified</SelectItem>
                        {team1 && <SelectItem value={team1}>{getTeam(team1)?.name} won toss</SelectItem>}
                        {team2 && <SelectItem value={team2}>{getTeam(team2)?.name} won toss</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !team1 || !team2}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        Generate Prediction <Sparkles className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </Card>
              </div>

              {/* Output Display */}
              <div className="lg:col-span-2">
                {!prediction && !isGenerating && (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <Dna className="text-slate-600 animate-pulse" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Analysis</h3>
                    <p className="text-slate-500 max-w-sm">
                      Select the participating teams and venue to trigger the AI predictive engine.
                    </p>
                  </div>
                )}

                {isGenerating && (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500"
                    />
                    <div className="space-y-2 text-center">
                      <h3 className="text-lg font-medium animate-pulse">Running Monte Carlo Simulations...</h3>
                      <p className="text-sm text-slate-500">Cross-referencing historical head-to-head records</p>
                    </div>
                  </div>
                )}

                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Result Card */}
                    <Card className="overflow-hidden bg-[#111] border-white/10 rounded-[2rem]">
                      <div className="h-3 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                      <div className="p-8 space-y-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                          <PredictionTeamDisplay 
                            team={getTeam(team1!)!} 
                            prob={prediction.probabilities?.[team1!] || prediction.winProbability?.[team1!] || 50} 
                            isWinner={prediction.winnerId === team1 || prediction.predictedWinnerId === team1}
                          />
                          <div className="flex flex-col items-center gap-2">
                            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              Win Probability
                            </div>
                            <div className="text-4xl font-black italic text-slate-600">VS</div>
                          </div>
                          <PredictionTeamDisplay 
                            team={getTeam(team2!)!} 
                            prob={prediction.probabilities?.[team2!] || prediction.winProbability?.[team2!] || 50} 
                            isWinner={prediction.winnerId === team2 || prediction.predictedWinnerId === team2}
                          />
                        </div>

                        <div className="space-y-6 py-8 border-y border-white/5">
                          <div className="flex justify-between items-end">
                            <div className="space-y-1">
                              <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                {getTeam(prediction.winnerId || prediction.predictedWinnerId)?.name} favored
                              </h4>
                              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                                <Info size={14} className="text-blue-500" /> 
                                AI Confidence Score: <span className="text-white font-bold">{prediction.confidence}%</span>
                              </p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Confidence Meter</span>
                              <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${prediction.confidence}%` }}
                                  className="h-full bg-blue-500"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                              <Sparkles size={14} /> AI Analysis
                            </h5>
                            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                              {prediction.explanation || prediction.aiExplanation}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5"><Calendar size={12} /> Live Simulation</span>
                            <span className="flex items-center gap-1.5 font-medium text-slate-400">
                              <MapPin size={12} /> {venues.find(v => v.id === venueId)?.name}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                                const text = `IPL Prediction: ${getTeam(prediction.winnerId || prediction.predictedWinnerId)?.name} favored to win! Generated by IPL Oracle AI.`;
                                navigator.clipboard.writeText(text);
                                toast.success("Copied to clipboard!");
                            }}
                            className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                          >
                            Share Card
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PredictionTeamDisplay = ({ team, prob, isWinner }: { team: Team, prob: number, isWinner: boolean }) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className={`relative w-28 h-28 flex items-center justify-center bg-white/5 rounded-[2rem] border-2 transition-all ${
      isWinner ? 'border-blue-500/50 scale-110 shadow-2xl shadow-blue-500/20' : 'border-white/5'
    }`}>
      <span className="text-3xl font-black italic tracking-tighter" style={{ color: team.primaryColor }}>
        {team.shortName}
      </span>
      {isWinner && (
        <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-[#111]">
          <Trophy size={14} />
        </div>
      )}
    </div>
    <div className="text-center">
      <div className="text-3xl font-black tabular-nums tracking-tighter">{prob}%</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{team.name}</div>
    </div>
  </div>
);

export default PredictionDashboard;
