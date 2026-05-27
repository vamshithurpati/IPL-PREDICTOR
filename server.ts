import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { syncLiveData } from "./src/services/liveDataService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Admin Sync Route
  app.post("/api/admin/sync", async (req, res) => {
    // In production, add auth check here
    try {
      const result = await syncLiveData();
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Sync failed" 
      });
    }
  });

  // Sync log status
  app.get("/api/admin/status", (req, res) => {
    res.json({ lastSync: new Date().toISOString(), status: "active" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
