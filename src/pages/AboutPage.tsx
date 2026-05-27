import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Dna, Database, Globe, Github } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-16 space-y-4">
        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Trophy className="text-blue-500 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase uppercase italic">About IPL Oracle AI</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          The world's most advanced predictive engine for Indian Premier League analytics.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Our Methodology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-black/40 border-white/5 space-y-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                 <Database className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold">Deep Data Synthesis</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We synthesize over 15 years of ball-by-ball IPL data, cross-referencing team dynamics, 
                individual player form, and seasonal variations.
              </p>
            </Card>
            <Card className="p-8 bg-black/40 border-white/5 space-y-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                 <Dna className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold">Conditional Modeling</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our model doesn't just look at history. It predicts based on dynamic 
                conditions like the toss, relative humidity, and even player matchup pressure.
              </p>
            </Card>
          </div>
        </section>

        <section className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight underline decoration-blue-500/50 underline-offset-8">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
             <TechBadge name="React 19" />
             <TechBadge name="TypeScript" />
             <TechBadge name="Gemini 2.0 AI" />
             <TechBadge name="Firebase Firestore" />
             <TechBadge name="Cloud Run" />
             <TechBadge name="Tailwind CSS" />
             <TechBadge name="Framer Motion" />
             <TechBadge name="Recharts" />
          </div>
          <p className="text-slate-500 text-sm italic">
            Built using modern full-stack architecture for near-instant analytical responses and real-time data sync.
          </p>
        </section>

        <footer className="pt-12 text-center space-y-6">
           <div className="flex justify-center gap-6">
             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
               <Github size={20} />
               <span className="text-sm font-medium">Source Code</span>
             </a>
             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
               <Globe size={20} />
               <span className="text-sm font-medium">API Docs</span>
             </a>
           </div>
           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-700">
             Disclaimer: IPL Oracle AI is for entertainment purposes only and does not support gambling or betting.
           </p>
        </footer>
      </div>
    </div>
  );
};

const TechBadge = ({ name }: { name: string }) => (
  <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300 font-medium px-4 py-1.5 rounded-xl">
    {name}
  </Badge>
);

export default AboutPage;
