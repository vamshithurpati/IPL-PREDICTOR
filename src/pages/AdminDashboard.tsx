import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  Database, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { auth, db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const AdminDashboard = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    teams: 10,
    players: 150,
    matches: 74,
    venues: 5
  });

  useEffect(() => {
    const q = query(collection(db, 'update_logs'), orderBy('timestamp', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/admin/sync', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        toast.success("Live data sync completed successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error("Sync failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="text-blue-500" /> System Administration
            </h1>
            <p className="text-slate-400">Manage live data synchronization and monitor system health.</p>
          </div>
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            className="bg-blue-600 hover:bg-blue-500 h-12 px-6 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing Live Data...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Live Data
              </>
            )}
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard icon={<Database size={20} />} label="Teams" value={stats.teams} color="blue" />
          <StatCard icon={<Activity size={20} />} label="Players" value={stats.players} color="indigo" />
          <StatCard icon={<RefreshCw size={20} />} label="Matches" value={stats.matches} color="purple" />
          <StatCard icon={<History size={20} />} label="Logs" value={logs.length} color="slate" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-0 overflow-hidden bg-white/[0.02] border-white/5">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-slate-300">
                  <History size={18} className="text-blue-500" /> Recent Sync Logs
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {logs.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">No logs available.</div>
                ) : (
                  logs.map(log => (
                    <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-white/[0.01] transition-colors">
                      <div className={`mt-1 p-1.5 rounded-full ${
                        log.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {log.status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-bold text-slate-200">{log.type}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString() : 'Just now'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{log.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border-white/5 space-y-4">
              <h3 className="font-bold text-slate-200">System Health</h3>
              <div className="space-y-4">
                <HealthItem label="API Connectivity" status="operational" />
                <HealthItem label="Firestore Real-time" status="operational" />
                <HealthItem label="AI Inference Engine" status="operational" />
              </div>
            </Card>

            <Card className="p-6 bg-white/[0.02] border-white/5 space-y-4">
              <h3 className="font-bold text-slate-200">Maintenance Tools</h3>
              <div className="space-y-2">
                <MaintenanceButton label="Clear Local Cache" />
                <MaintenanceButton label="Re-index Database" />
                <MaintenanceButton label="Validate AI Schemas" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <Card className="p-6 bg-white/[0.02] border-white/5 flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">{label}</div>
      <div className="text-2xl font-black italic">{value}</div>
    </div>
  </Card>
);

const HealthItem = ({ label, status }: any) => (
  <div className="flex justify-between items-center px-4 py-3 bg-black/20 rounded-xl">
    <span className="text-xs font-bold text-slate-300">{label}</span>
    <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-[8px] font-bold">
      {status.toUpperCase()}
    </Badge>
  </div>
);

const MaintenanceButton = ({ label }: any) => (
  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-xs font-bold text-slate-400 flex items-center justify-between group">
    {label}
    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

export default AdminDashboard;
