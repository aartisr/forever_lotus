import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Deep Dive / Website Evaluation Endpoint
  app.post("/api/evaluate-ai", async (req: Request, res: Response) => {
    try {
      const { url = "https://foreverlotus.com", prompt, aspect = "general" } = req.body;
      const ai = getGenAI();

      const systemInstruction = `You are a world-class Web Auditor, UI/UX Evaluator, Conversion Architect, and Brand Strategist.
Your role is to rigorously evaluate websites (specifically foreverlotus.com and comparative URLs) on a strict 1 to 10 scale across design, UX/UI, information clarity, value proposition, technical foundation, and trust metrics.
Provide objective, highly detailed, nuanced, structured insights. Always cite clear observations, strengths, critical weaknesses, and actionable step-by-step recommendations.`;

      const userContent = `Evaluate the target website: "${url}"
Focus aspect: ${aspect}
Specific inquiry / prompt:
${prompt || `Provide a comprehensive 1 to 10 rating breakdown for foreverlotus.com covering:
1. Brand & Aesthetic Design (1-10)
2. Content & Civilizational Framework Clarity (1-10)
3. UX & Navigation Flow (1-10)
4. Commercial / Call-to-Action Utility (1-10)
5. Technical, SEO & Trust Signals (1-10)
Overall Score and top 3 critical takeaways.`}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: userContent,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        result: response.text,
        aspect,
        targetUrl: url,
      });
    } catch (error: any) {
      console.error("AI Evaluation error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to run AI evaluation",
      });
    }
  });

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
