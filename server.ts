import express, { Request, Response } from "express";
import path from "path";
import compression from "compression";
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

  // High-performance response compression (gzip / deflate)
  app.use(compression({
    level: 6,
    threshold: 512,
  }));

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
        model: "gemini-2.5-flash",
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

  // ==========================================
  // AI Agent & Machine Discovery Endpoints (AXO / GEO / AIO)
  // ==========================================

  // 1. Institutional Summary for AI Search & Copilots
  app.get("/api/discovery/summary", (_req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      entity: "Forever Lotus",
      founder: "Subasri Dorairaj",
      canonicalUrl: "https://foreverlotus.com",
      mission: "Establishing the technical, philosophical, and legal foundations of the Non-Extractive Web.",
      principles: [
        "Ahimsa (Non-harm in UX design)",
        "Digital Dignity & Radical Privacy",
        "Zero Dark Patterns & Dopaminergic Traps",
        "Cognitive Liberty & User Sovereignty",
        "Awaricon Proof-of-Presence Certification"
      ],
      canonicalLinks: {
        manifesto: "https://foreverlotus.com/manifesto",
        philosophy: "https://foreverlotus.com/philosophy",
        observatory: "https://foreverlotus.com/observatory",
        accord: "https://foreverlotus.com/accord",
        awaricon: "https://foreverlotus.com/awaricon",
        research: "https://foreverlotus.com/research",
        llmsContext: "https://foreverlotus.com/llms.txt",
        fullContext: "https://foreverlotus.com/llms-full.txt"
      }
    });
  });

  // 2. Real-Time Telemetry & Dignity Observatory
  app.get("/api/discovery/metrics", (_req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      timestamp: new Date().toISOString(),
      source: "Forever Lotus Global Dignity Observatory",
      metrics: [
        {
          index: "NEWF",
          label: "Non-Extractive Web Footprint",
          value: "14.2M",
          delta: "+28.4% YoY",
          verifiedBy: "Global Observatory Node Mesh"
        },
        {
          index: "ADTI",
          label: "Algorithmic Trap Reduction",
          value: "84.7%",
          delta: "-62.1% Trap Density",
          verifiedBy: "Awaricon Protocol Engine"
        },
        {
          index: "ACN",
          label: "Awaricon Certified Nodes",
          value: "1,248",
          delta: "100% Cryptographically Verified",
          verifiedBy: "Autonomous Verification Grid"
        },
        {
          index: "GDAS",
          label: "Global Dignity Accord Signatories",
          value: "42",
          delta: "18 Sovereign Countries",
          verifiedBy: "Institutional Assembly"
        }
      ]
    });
  });

  // 3. 15 Manifesto Pillars & Axioms
  app.get("/api/discovery/manifesto", (_req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      title: "The Forever Lotus Manifesto",
      subtitle: "15 Actionable Pillars for Non-Extractive Software Architecture",
      author: "Subasri Dorairaj",
      license: "CC0 1.0 Universal",
      pillars: [
        "1. Radical Privacy as a Sacred Baseline",
        "2. Algorithmic Ahimsa (Zero Psychological Harm)",
        "3. Cognitive Liberty & Attentional Sovereignty",
        "4. Total Dark Pattern Prohibition",
        "5. Local-First & Sovereign Data Custody",
        "6. Transparent Open-Source Governance",
        "7. Zero Surveillance Advertising",
        "8. Immutable Proof-of-Presence over Tracking",
        "9. Non-Extractive Economic Models",
        "10. Ecological & Computational Frugality",
        "11. Epistemic Integrity over Engagement Bait",
        "12. Decentralized Interdependent Architecture",
        "13. Respect for Human Temporal Rhythm",
        "14. Dignity-Centered Accessibility",
        "15. Perpetual Vow of Civilizational Compassion"
      ]
    });
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
    // Cache static immutable assets for 1 year
    app.use(express.static(distPath, {
      maxAge: "30d",
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get("*", (_req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
