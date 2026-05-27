import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TEAMS } from '../mockData';

const PointsTable = () => {
  const tableData = [
    { team: 'rcb', p: 8, w: 6, l: 2, nrr: '+0.840', pts: 12 },
    { team: 'csk', p: 8, w: 5, l: 3, nrr: '+0.520', pts: 10 },
    { team: 'kkr', p: 7, w: 5, l: 2, nrr: '+0.480', pts: 10 },
    { team: 'rr', p: 8, w: 5, l: 3, nrr: '+0.310', pts: 10 },
    { team: 'mi', p: 8, w: 4, l: 4, nrr: '+0.120', pts: 8 },
    { team: 'lsg', p: 7, w: 3, l: 4, nrr: '-0.150', pts: 6 },
    { team: 'dc', p: 8, w: 3, l: 5, nrr: '-0.320', pts: 6 },
    { team: 'pbks', p: 8, w: 3, l: 5, nrr: '-0.410', pts: 6 },
    { team: 'srh', p: 7, w: 2, l: 5, nrr: '-0.560', pts: 4 },
    { team: 'gt', p: 8, w: 2, l: 6, nrr: '-0.780', pts: 4 },
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
       <div className="space-y-1 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">IPL 2026 Table</h1>
        <p className="text-slate-400">Live standings and playoff qualification trajectory.</p>
      </div>

      <Card className="overflow-hidden bg-black/40 border-white/5 rounded-[2rem]">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-12 text-center">POS</TableHead>
              <TableHead>TEAM</TableHead>
              <TableHead className="text-center">P</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">NRR</TableHead>
              <TableHead className="text-center font-bold text-white">PTS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, idx) => {
              const team = TEAMS.find(t => t.id === row.team);
              const isPlayoff = idx < 4;
              return (
                <TableRow key={row.team} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                  <TableCell className="text-center font-mono opacity-50">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-xs border border-white/10" style={{ backgroundColor: `${team?.primaryColor}20`, color: team?.primaryColor }}>
                        {team?.shortName}
                      </div>
                      <span className="font-bold tracking-tight uppercase italic">{team?.name}</span>
                      {isPlayoff && <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{row.p}</TableCell>
                  <TableCell className="text-center font-medium">{row.w}</TableCell>
                  <TableCell className="text-center font-medium">{row.l}</TableCell>
                  <TableCell className={`text-center font-mono text-xs ${row.nrr.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {row.nrr}
                  </TableCell>
                  <TableCell className="text-center font-black text-xl italic text-blue-400">{row.pts}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        <Badge variant="outline" className="border-white/5 text-slate-500 rounded-full px-4 py-1">
          Q - Qualified
        </Badge>
        <Badge variant="outline" className="border-white/5 text-slate-500 rounded-full px-4 py-1">
          E - Eliminated
        </Badge>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Playoff Zone</span>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
