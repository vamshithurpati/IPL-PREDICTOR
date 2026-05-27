import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, TrendingUp, Search, Filter, ArrowRight, Wind } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { VENUES } from '../mockData';
import { Venue } from '../types';

const GroundsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [venues, setVenues] = useState<Venue[]>(VENUES);

  const pitchTypes = ['All', 'Batting-friendly', 'Spin-friendly', 'Balanced', 'Pace-friendly'];

  useEffect(() => {
    const filtered = VENUES.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            v.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'All' || v.pitchType === filterType;
      return matchesSearch && matchesFilter;
    });
    setVenues(filtered);
  }, [searchTerm, filterType]);

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">IPL Grounds & Venues</h1>
          <p className="text-slate-400">Deep dive into stadium statistics, pitch behavior, and historical trends.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input 
              placeholder="Search by stadium or city..." 
              className="pl-10 bg-white/5 border-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {pitchTypes.map(type => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type)}
                className="whitespace-nowrap border-white/10"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-[#111] border-white/5 group hover:border-blue-500/30 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={venue.imageUrl} 
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="mb-2 bg-blue-600/80 backdrop-blur-md">{venue.city}</Badge>
                    <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg Score</div>
                      <div className="text-lg font-black text-white italic">{venue.avgFirstInn}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Pitch Type</div>
                      <div className="text-sm font-bold text-blue-400">{venue.pitchType}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Users size={12} /> {venue.capacity?.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} /> {venue.historicalMatchCount} Matches</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-blue-500 hover:text-blue-400 group/btn">
                      <Link to={`/grounds/${venue.id}`}>
                        Insights <ArrowRight size={14} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroundsPage;
