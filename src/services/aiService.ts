import { GoogleGenAI } from "@google/genai";
import { Team, Player, Match, VenueStats } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generatePrediction(
  team1: Team,
  team2: Team,
  players1: Player[],
  players2: Player[],
  venue: VenueStats,
  tossWinnerId?: string
) {
  const prompt = `
    Analyze an upcoming IPL cricket match between ${team1.name} (${team1.shortName}) and ${team2.name} (${team2.shortName}).
    
    Venue Information:
    - Venue: ${venue.name}
    - Avg Score: ${venue.avgScore}
    - Batting First Win %: ${venue.battingFirstWinPct}%
    
    Team 1 (${team1.name}) Key Players:
    ${players1.slice(0, 5).map(p => `- ${p.name} (Runs: ${p.runs}, Wickets: ${p.wickets}, SR: ${p.strikeRate})`).join('\n')}
    
    Team 2 (${team2.name}) Key Players:
    ${players2.slice(0, 5).map(p => `- ${p.name} (Runs: ${p.runs}, Wickets: ${p.wickets}, SR: ${p.strikeRate})`).join('\n')}
    
    ${tossWinnerId ? `Toss Winner: ${tossWinnerId === team1.id ? team1.name : team2.name}` : ''}
    
    Task:
    Provide a win probability prediction and a detailed explanation (2-3 paragraphs) of why one team is favored.
    Output format: JSON with fields "winnerId" (string, one of the two team IDs), "probabilities" (object mapping team IDs to percentages), "confidence" (0-100), "explanation" (string).
    
    Team 1 ID: ${team1.id}
    Team 2 ID: ${team2.id}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation error:", error);
    throw error;
  }
}
